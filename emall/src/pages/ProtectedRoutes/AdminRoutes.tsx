import { Navigate } from "react-router-dom";
import { getAuthUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/app/hook";
const AdminRoute = ({ children }:{ children: React.ReactNode }) => {
   
     const user = useAppSelector(getAuthUser)
     const isAuthenticated = useAppSelector(getIsAuthenticated)

  return isAuthenticated && user?.role === 'admin' || isAuthenticated && user?.role === 'customer service'   ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;