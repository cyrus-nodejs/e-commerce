import { Navigate } from "react-router-dom";
import { getAuthUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";

import { useAppSelector} from "../../redux/app/hook";

const PrivateRoute = ({ children }:{ children: React.ReactNode }) => {
   
   const user = useAppSelector(getAuthUser)
   console.log(user?.role)
   const isAuthenticated = useAppSelector(getIsAuthenticated)
   const loading = useAppSelector((state) => state.auth.loading);
   console.log("User:", user);
   console.log("Authenticated:", isAuthenticated);
   if (loading) {
    // Optionally show a loader or null
    return <div>Loading...</div>;
  }
  return user && isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;