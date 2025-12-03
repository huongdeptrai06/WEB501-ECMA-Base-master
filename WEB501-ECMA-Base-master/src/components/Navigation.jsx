import { Link } from "react-router-dom";

export default function Navigation({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          <strong>WEB501 App</strong>
        </Link>

        {isLoggedIn && (
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="hover:text-gray-200 cursor-pointer"
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
              <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
