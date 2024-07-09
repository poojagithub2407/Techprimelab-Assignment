import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Projects',
        backgroundColor: '#0047ab',
        data: [],
        barPercentage: 0.4, // Default for mobile view
        categoryPercentage: 0.6, // Default for mobile view
      },
      {
        label: 'Closed Projects',
        backgroundColor: '#04942b',
        data: [],
        barPercentage: 0.4, // Default for mobile view
        categoryPercentage: 0.6, // Default for mobile view
      },
    ],
  });


  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Department-wise Total vs Closed Projects',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        stacked: false,
      },
      y: {
        stacked: false,
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
      options.maintainAspectRatio = !isMobile; // Adjust maintainAspectRatio based on screen size
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects/chartProject');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();

        const labels = responseData.departmentCounts.map(item => item.department);
        const totalProjects = responseData.departmentCounts.map(item => item.totalProjects);
        const closedProjects = responseData.departmentCounts.map(item => item.closedProjects);

        setData(prevData => ({
          labels: labels,
          datasets: [
            {
              ...prevData.datasets[0], // Total Projects dataset
              data: totalProjects,
            },
            {
              ...prevData.datasets[1], // Closed Projects dataset
              data: closedProjects,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
