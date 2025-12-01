import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001/tours";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        setForm(data);
      } catch {
        toast.error("Không tìm thấy tour");
        navigate("/List");
      }
    };
    fetchTour();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, form);
      toast.success("Cập nhật thành công");
      navigate("/List");
    } catch {
      toast.error("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tour {id}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label>Tên tour</label>
          <input
            className="border p-2 w-full"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Điểm đến</label>
          <input
            className="border p-2 w-full"
            name="destination"
            value={form.destination}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Thời lượng</label>
          <input
            className="border p-2 w-full"
            name="duration"
            value={form.duration}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Giá</label>
          <input
            type="number"
            className="border p-2 w-full"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ảnh (URL)</label>
          <input
            className="border p-2 w-full"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mô tả</label>
          <textarea
            rows={3}
            className="border p-2 w-full"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Cập nhật
        </button>
      </form>
    </div>
  );
}
