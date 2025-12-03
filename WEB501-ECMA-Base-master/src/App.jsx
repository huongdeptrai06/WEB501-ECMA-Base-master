import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router-dom";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";

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

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/list" element={<ProtectedRoute Component={ListPage} />} />
        <Route path="/add" element={<ProtectedRoute Component={AddPage} />} />
        <Route path="/edit/:id" element={<ProtectedRoute Component={EditPage} />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
