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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total',
        backgroundColor: '#0047ab',
        data: [65, 59, 80, 81, 56, 55, 40],
        barPercentage: 0.4,
        categoryPercentage: 0.3,
      },
      {
        label: 'Closed',
        backgroundColor: '#04942b',
        data: [28, 48, 40, 19, 86, 27, 90],
        barPercentage: 0.4,
        categoryPercentage: 0.3,
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
      const isMobile = window.innerWidth <= 768; 
      options.maintainAspectRatio = !isMobile; 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
