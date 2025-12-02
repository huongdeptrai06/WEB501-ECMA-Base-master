import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/tours");
        setTours(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (confirm("Tao muon xoa tour nay")) {
        await axios.delete("http://localhost:3000/tours/" + id);
        setTours(tours.filter((tour) => tour.id !== id));
        toast.success("Ok tao da xoa duoc roi");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderBody = () => {
    return tours.map((tour, index) => (
      <tr key={tour.id}>
        <td className="border px-4 py-2 text-center">{index + 1}</td>
        <td className="border px-4 py-2">{tour.name}</td>
        <td className="border px-4 py-2 text-center">{tour.destination}</td>
        <td className="border px-4 py-2 text-center">{tour.duration}</td>
        <td className="border px-4 py-2 text-center">{tour.price}</td>

        <td className="border px-4 py-2 text-center">
          <img src={tour.image} className="w-16 h-16 object-cover rounded" />
        </td>

        <td className="border px-4 py-2">{tour.description}</td>

        <td className="border px-4 py-2 text-center">{tour.available}</td>

        <td className="border px-4 py-2 text-center space-x-2">
          <Link
            to={`/edit/${tour.id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            sửa
          </Link>

          <button
            onClick={() => handleDelete(tour.id)}
            className="px-3 py-1 bg-red-600 text-white rounded"
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
