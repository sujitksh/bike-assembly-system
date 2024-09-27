import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    const fetchBikes = async () => {
    const token = localStorage.getItem("token");
      const headers = {
         'Authorization':`Bearer ${token}`,
         "Content-Type":"application/json"
      }
      const response = await axios.get('http://localhost:5000/api/bikes',{headers});
      if(response.status == 200){
        setBikes(response.data);
      }else{
        navigate("/login")
      }
    };
    fetchBikes();
  }, []);

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setTimeTaken(bike.time);
  };

  const handleCompleteAssembly = async() => {
    const employeeId = localStorage.getItem("empId");
    const token = localStorage.getItem("token");
    const headers = {
        'Authorization':`Bearer ${token}`,
        "Content-Type":"application/json"
     }
    await axios.post('http://localhost:5000/api/assemble',{ bikeId: selectedBike._id, employeeId },{headers});
    alert(`You have successfully assembled ${selectedBike.name} in ${timeTaken} minutes!`);
    setSelectedBike(null);
    setTimeTaken(0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Bike Assembly System</h2>
      
      {!selectedBike ? (
        <><h4>Select a Bike to Assemble:</h4><div className='bikelist'>
                  {bikes.map((bike) => (
                      <div key={bike._id} style={{ margin: '10px' }}>
                          <h3>{bike.name}</h3>
                          <p><img src={`http://localhost:5000/${bike.image}`} width="200px" height="150px" /></p>
                          <p>Description: {bike.description} </p>
                          <p>Time to Complete: {bike.time} minutes</p>
                          <button onClick={() => handleSelectBike(bike)} className='btn btn-primary'>Select</button>
                      </div>
                  ))}
              </div></>
      ) : (
        <div>
          <h3>You have selected: {selectedBike.name}</h3>
          <p>Description of Bike: {selectedBike.description} </p>
          <p>Estimated Time to Complete: {timeTaken} minutes</p>
          <button onClick={handleCompleteAssembly} className='btn btn-success'>Complete Assembly</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
