import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function GuestRoute() {
    const {user}=useAuth();
    if (user) {
        return <Navigate to="/dashboard/chats" replace />;
    }

    return <Outlet />;
}