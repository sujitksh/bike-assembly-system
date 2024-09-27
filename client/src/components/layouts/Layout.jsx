import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbars from '../Navbars'
import { Navigate } from 'react-router-dom'
function Layout() {
  
    if(!localStorage.getItem("token")){
       return <Navigate to="/login"/>
    }
    
  return (
    <div>
        <Navbars role={localStorage.getItem("role")}/>
       <Outlet/>
    </div>
  )
}

export default Layout