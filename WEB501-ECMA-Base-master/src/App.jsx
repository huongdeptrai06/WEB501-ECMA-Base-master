import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function Navigation({ isLoggedIn, onLogout }) {
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

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const ProtectedComponent = ({ Component }) => {
    const user = localStorage.getItem("user");
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <Component />;
  };

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/list"
          element={<ProtectedComponent Component={ListPage} />}
        />
        <Route
          path="/add"
          element={<ProtectedComponent Component={AddPage} />}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedComponent Component={EditPage} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
