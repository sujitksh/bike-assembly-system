import React, { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Layout from './components/layouts/Layout';
import Admin from './components/Admin';


const App = () => {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/"  element={<Navigate to="/login"/>}/>
    <Route path="/login"  element={<Login />}/>
       <Route path="/employee" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />}/>
       </Route>
       <Route path="/admin" element={<Admin />}/>
       <Route path="*" element={<p>Page not found</p>}/>
    </Routes>
 </BrowserRouter>  
  )
};

export default App;
