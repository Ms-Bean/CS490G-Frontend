import React from 'react'
import {Navigate} from "react-router-dom"
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({children, link}) => {
    const {user, isLoading} = useAuth()

    if(isLoading) return <div className="container">Loading...</div>

    if(user) {
        return <Navigate to={link}/>
    }
    return children

};

export default PrivateRoute;