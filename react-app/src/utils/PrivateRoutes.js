import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({link}) => {

    const {user, isLoading} = useAuth();

    if(isLoading) return <div className="container">Loading...</div>
    return(
        user ? <Outlet/> : <Navigate to={link} />
    )
}

export default PrivateRoutes;