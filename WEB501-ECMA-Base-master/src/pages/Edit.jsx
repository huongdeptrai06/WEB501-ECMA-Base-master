import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { tourService } from '../services/tourService';

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
    category: "Tour nội địa",
    active: true,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const getTour = async () => {
      const result = await tourService.getById(id);
      if (result.success) {
        setForm(result.data);
      } else {
        toast.error(result.error || 'Không tìm thấy tour');
      }
    };

    getTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await tourService.update(id, form);
    if (result.success) {
      toast.success("Cập nhật thành công");
      navigate("/list");
    } else {
      toast.error(result.error || 'Không thể cập nhật tour');
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

        <div>
          <label>Danh mục</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Tour nội địa">Tour nội địa</option>
            <option value="Tour quốc tế">Tour quốc tế</option>
            <option value="Tour du lịch biển">Tour du lịch biển</option>
            <option value="Tour khám phá">Tour khám phá</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Tour đang hoạt động</span>
          </label>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
