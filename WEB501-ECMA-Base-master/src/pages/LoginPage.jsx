import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:3000/login', {
        email, 
        password,
      })
      toast.success('Đăng nhập thành công!')
      localStorage.setItem('user', JSON.stringify(data))
      window.dispatchEvent(new Event('localStorageChange'))
      nav('/list')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
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
          Đăng nhập
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
