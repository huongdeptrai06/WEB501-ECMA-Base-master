import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001/tours";

function ListPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setTours(data);
      } catch (err) {
        setError("Không thể tải danh sách tour");
        toast.error("Không thể tải danh sách tour");
      } finally {
        setLoading(false);
      }
    };

    getTours();
  }, []);

  const deleteTour = async (id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa tour này?");
    if (!isConfirm) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTours((prev) => prev.filter((tour) => tour.id !== id));
      toast.success("Đã xóa tour");
    } catch (err) {
      toast.error("Xóa tour thất bại");
    }
  };

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }),
    []
  );

  const renderBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
            Đang tải danh sách tours...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={9} className="px-4 py-6 text-center text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (!tours.length) {
      return (
        <tr>
          <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
            Chưa có tour nào. Thêm tour mới để hiển thị tại đây.
          </td>
        </tr>
      );
    }

    return tours.map((tour, index) => (
      <tr key={tour.id} className="hover:bg-gray-50">
        <td className="px-4 py-2 border text-center">{index + 1}</td>
        <td className="px-4 py-2 border font-semibold text-gray-900">
          {tour.name}
        </td>
        <td className="px-4 py-2 border text-center">{tour.destination}</td>
        <td className="px-4 py-2 border text-center">{tour.duration}</td>
        <td className="px-4 py-2 border text-center font-semibold text-red-600">
          {currencyFormatter.format(Number(tour.price) || 0)}
        </td>
        <td className="px-4 py-2 border text-center">
          <img
            src={tour.image}
            alt={tour.name}
            className="mx-auto h-16 w-24 rounded object-cover"
          />
        </td>
        <td className="px-4 py-2 border">{tour.description}</td>
        <td className="px-4 py-2 border text-center">{tour.available}</td>
        <td className="px-4 py-2 border text-center space-x-2">
          <button
            type="button"
            className="rounded bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600"
            onClick={() => navigate(`/Edit/${tour.id}`)}
          >
            Sửa
          </button>
          <button
            type="button"
            className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
            onClick={() => deleteTour(tour.id)}
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
