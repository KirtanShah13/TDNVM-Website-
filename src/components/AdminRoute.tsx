import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;


//need to make production ready 