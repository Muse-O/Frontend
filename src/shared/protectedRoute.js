import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    alert("로그인이 필요한 서비스 입니다.");
    return <Navigate to="/login" />;
  }

  return children;
};
