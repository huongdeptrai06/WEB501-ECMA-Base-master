import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
}
