import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [emp, setEmp] = useState({
        username:"",
        password:""
    });

    const handleInput = (e)=>{
         setEmp({...emp,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const getData = async()=>{
            const response = await axios.post("http://localhost:5000/api/login",emp)
            const token = response.data.token;
            if(response.status === 200 && response.data.role == 'USER'){
                localStorage.setItem("token",token);
                localStorage.setItem("username",response.data.username);
                localStorage.setItem("role",response.data.role);
                localStorage.setItem("empId",response.data.empId);
                navigate("/employee/dashboard")
            }
            if(response.status === 200 && response.data.role == 'ADMIN'){
                localStorage.setItem("token",token);
                localStorage.setItem("username",response.data.username);
                localStorage.setItem("role",response.data.role);
                localStorage.setItem("empId",response.data.empId);
                navigate("/admin")
            }
        }
        getData()
    }
  return (
    <Card className='login-form'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter username" value={emp.username}
         onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" value={emp.password}
         onChange={handleInput} />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </Card>
  )
}

export default Login