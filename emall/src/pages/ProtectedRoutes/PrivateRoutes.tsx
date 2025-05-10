import { Navigate } from "react-router-dom";
import { getAuthUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/app/hook";
const PrivateRoute = ({ children }:{ children: React.ReactNode }) => {
   
     const user = useAppSelector(getAuthUser)
     const isAuthenticated = useAppSelector(getIsAuthenticated)

  return user && isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;