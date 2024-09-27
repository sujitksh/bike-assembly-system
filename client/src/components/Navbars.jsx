import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';


function Navbars({role}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  useEffect(()=>{
      const username = localStorage.getItem("username");
      setUsername(username)
  },[])
  const handleLogout = ()=>{
           localStorage.removeItem("token");
           localStorage.removeItem("username")
           localStorage.removeItem("role");
           localStorage.removeItem("empId");
           if(!localStorage.getItem("token")){
              navigate("/")
           }
     
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">{role == "ADMIN"?"Admin":"Employee"}<span style={{"padding":"10px","color":"blue"}}>Dashboard</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
          <NavDropdown title={username?username:"user"} id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
             
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars