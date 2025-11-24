import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:3000/tours";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu tours");
        }
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message || "Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }),
    []
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-gray-500">
          Đang tải danh sách tours...
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      );
    }

    if (!tours.length) {
      return (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-700">
          Hiện chưa có tour nào. Thử thêm mới để bắt đầu.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full divide-y divide-gray-200 bg-white text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Điểm đến</th>
              <th className="px-4 py-3">Thời lượng</th>
              <th className="px-4 py-3 text-right">Giá</th>
              <th className="px-4 py-3 text-center">Chỗ còn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {tours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900">{tour.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {tour.description}
                  </p>
                </td>
                <td className="px-4 py-3">{tour.destination}</td>
                <td className="px-4 py-3">{tour.duration}</td>
                <td className="px-4 py-3 text-right font-semibold text-blue-600">
                  {formatter.format(tour.price)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex min-w-[64px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                      tour.available > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tour.available}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wider text-blue-600">
          Danh sách tours
        </p>
        <h1 className="text-3xl font-semibold text-gray-900">Tours hiện có</h1>
        <p className="text-gray-600">
          Theo dõi thông tin tour, giá bán và số lượng chỗ trống còn lại.
        </p>
      </header>

      {renderContent()}
    </section>
  );
}

export default List;