import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/register', {
        email, 
        password,
      })
      toast.success('Đăng ký thành công!')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Đăng ký</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng ký
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
