import React,{useState,useEffect} from 'react'
import Navbars from './Navbars'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import axios from 'axios';

function Admin() {
    const [dashboardData, setDashboardData] = useState({ totalBikesAssembled: 0, employeeProduction: {} });
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleFetchDashboardData = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization':`Bearer ${token}`,
            "Content-Type":"application/json"
        }
        const response = await axios.get(`http://localhost:5000/api/dashboard?from=${fromDate}&to=${toDate}`,{headers});
        setDashboardData(
            {...dashboardData,
             totalBikesAssembled:response.data.totalBikesAssembled,
             employeeProduction:response.data.employeeProduction
            }
        );
      };
      
      const barData = {
        labels: Object.keys(dashboardData.employeeProduction),
        datasets: [
          {
            label: 'Bikes Assembled by Employee',
            data: Object.values(dashboardData.employeeProduction),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
      };

  return (
    <div>
        <Navbars role={localStorage.getItem("role")} />
        <div className='chart'>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={handleFetchDashboardData} className='btn btn-primary fetchData'>Fetch Data</button>
        <h3>Total Bikes Assembled: {dashboardData.totalBikesAssembled}</h3>
        <div className='bar-chart'>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  )
}

export default Admin