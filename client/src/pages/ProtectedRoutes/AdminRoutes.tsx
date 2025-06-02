import { Navigate } from "react-router-dom";
import { getAuthUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";

import { useAppSelector} from "../../redux/app/hook";

const AdminRoute = ({ children }:{ children: React.ReactNode }) => {
   
   const user = useAppSelector(getAuthUser)
   console.log(user?.role)
  //  const accessLevel = user
   const isAuthenticated = useAppSelector(getIsAuthenticated)
   const loading = useAppSelector((state) => state.auth.loading);
   
   
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allowedRoles : any = ["admin", "customer service", "super admin"];

if (loading && !user) {
  return <div>Loading...</div>;
}
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
export default AdminRoute;