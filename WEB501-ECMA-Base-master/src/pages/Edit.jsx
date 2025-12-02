import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {useNavigate,useParams } from 'react-router-dom'

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const getTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/tours/${id}`);
        setForm(data);
      } catch {
        toast.error("Không tìm thấy tour");
      }
    };

    getTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/tours/${id}`, {
        ...form,
        price: Number(form.price),
        available: Number(form.available)
      });
      toast.success("Cập nhật thành công");
      navigate("/List");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tour {id}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
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
          <label>Ảnh</label>
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
          ></textarea>
        </div>

        <div>
          <label>Số lượng</label>
          <input
            type="number"
            className="border p-2 w-full"
            name="available"
            value={form.available}
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

export default EditPage;
