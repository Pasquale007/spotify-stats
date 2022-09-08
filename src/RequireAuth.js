import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    return (
        (sessionStorage.getItem("accessToken")) ? <Outlet /> : <Navigate to="/login" replace />
        //auth ? <Outlet /> // Rendere eingebetete Route(n) im Routing
        //: auth?.user
        //  ? <Navigate to="/unauthorized" replace /> // falsche Rolle
        //   : <Navigate to="/login" replace /> // nicht angemeldet
    );
}
export default RequireAuth;
