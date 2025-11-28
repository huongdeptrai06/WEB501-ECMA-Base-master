import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001/tours";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        reset(data);
      } catch (error) {
        toast.error("Không tìm thấy tour");
        navigate("/List");
      }
    };

    fetchTour();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      await axios.put(`${API_URL}/${id}`, values);
      toast.success("Cập nhật thành công");
      navigate("/List");
    } catch (error) {
      toast.error("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa tour {id}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Tên tour </label>
          <input
            className="border p-2 w-full"
            {...register("name", { required: "Không được để trống" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label>Điểm đến </label>
          <input
            className="border p-2 w-full"
            {...register("destination", { required: "Không được để trống" })}
          />
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination.message}</p>
          )}
        </div>

        <div>
          <label>Thời lượng </label>
          <input
            className="border p-2 w-full"
            {...register("duration", { required: "Không được để trống" })}
          />
        </div>

        <div>
          <label>Giá </label>
          <input
            type="number"
            className="border p-2 w-full"
            {...register("price", { required: "Không được để trống" })}
          />
        </div>

        <div>
          <label>Ảnh (URL)</label>
          <input
            className="border p-2 w-full"
            {...register("image", { required: "Không được để trống" })}
          />
        </div>

        <div>
          <label>Mô tả </label>
          <textarea
            rows={3}
            className="border p-2 w-full"
            {...register("description", { required: "Không được để trống" })}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Đang lưu..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}