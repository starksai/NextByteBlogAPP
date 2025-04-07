import { RouteSignIn } from '@/Helpers/Routename'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthRouteProtechtion = () => {
    const user = useSelector((state) => state.user)
    if (user && user.isLoggedIn) {
        return (
            <Outlet />
        )
    }
    else{
        return <Navigate to={RouteSignIn} />
    }
}
