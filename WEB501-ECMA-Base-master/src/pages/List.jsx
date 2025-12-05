import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { tourService } from "../services/tourService";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      const result = await tourService.getAll();
      if (result.success) {
        setTours(result.data);
      } else {
        toast.error(result.error || 'Không thể tải danh sách tour');
      }
    };
    getTours();
  }, []);

  const handleDelete = async (id) => {
    const tour = tours.find((t) => t.id === id);
    const tourName = tour?.name || "tour này";
    if (window.confirm(`Bạn có chắc chắn muốn xóa tour "${tourName}"?`)) {
      const result = await tourService.delete(id);
      if (result.success) {
        setTours(tours.filter((tour) => tour.id !== id));
        toast.success("Xóa tour thành công!");
      } else {
        toast.error(result.error || 'Không thể xóa tour');
      }
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    const result = await tourService.toggleActive(id, currentActive);
    if (result.success) {
      setTours(
        tours.map((tour) =>
          tour.id === id ? { ...tour, active: !currentActive } : tour
        )
      );
      toast.success(
        `Tour đã được ${!currentActive ? "kích hoạt" : "vô hiệu hóa"}!`
      );
    } else {
      toast.error(result.error || 'Không thể thay đổi trạng thái tour');
    }
  };

  const renderBody = () => {
    return tours.map((tour, index) => (
      <tr key={tour.id}>
        <td className="border px-4 py-2 text-center">{index + 1}</td>
        <td className="border px-4 py-2">{tour.name}</td>
        <td className="border px-4 py-2 text-center">{tour.destination}</td>
        <td className="border px-4 py-2 text-center">{tour.duration}</td>
        <td className="border px-4 py-2 text-center">{tour.price?.toLocaleString('vi-VN')} đ</td>

        <td className="border px-4 py-2 text-center">
          <img src={tour.image} className="w-16 h-16 object-cover rounded" />
        </td>

        <td className="border px-4 py-2">{tour.description}</td>

        <td className="border px-4 py-2 text-center">{tour.available}</td>

        <td className="border px-4 py-2 text-center">{tour.category || "N/A"}</td>

        <td className="border px-4 py-2 text-center">
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleToggleActive(tour.id, tour.active)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                tour.active 
                  ? 'bg-green-500 focus:ring-green-500' 
                  : 'bg-gray-300 focus:ring-gray-400'
              }`}
              role="switch"
              aria-checked={tour.active}
              title={tour.active ? 'Tắt tour' : 'Bật tour'}
            >
              <span
              />
            </button>
          </div>
        </td>

        <td className="border px-4 py-2 text-center space-x-2">
          <Link
            to={`/edit/${tour.id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sửa
          </Link>

          <button
            onClick={() => handleDelete(tour.id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-wide text-blue-600">
          Danh sách tour
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-center">STT</th>
              <th className="px-4 py-2 border text-left">Tên Tour</th>
              <th className="px-4 py-2 border text-center">Địa điểm</th>
              <th className="px-4 py-2 border text-center">Thời gian</th>
              <th className="px-4 py-2 border text-center">Giá</th>
              <th className="px-4 py-2 border text-center">Thumbnail</th>
              <th className="px-4 py-2 border text-left">Mô tả</th>
              <th className="px-4 py-2 border text-center">Sẵn có</th>
              <th className="px-4 py-2 border text-center">Danh mục</th>
              <th className="px-4 py-2 border text-center">Trạng thái</th>
              <th className="px-4 py-2 border text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
