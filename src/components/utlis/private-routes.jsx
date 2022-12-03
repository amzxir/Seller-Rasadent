import { useContext, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Context from '../../context/context'

const PrivateRoutes = () => {
    const {auth , setAuth} = useContext(Context)

    console.log(auth)

    return(
        !auth ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes;