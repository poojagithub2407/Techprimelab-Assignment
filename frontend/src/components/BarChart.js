import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import BASE_URL from '../api/api';

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
    datasets: [
      {
        label: 'Total',
        backgroundColor: '#0047ab',
        data: [],
        barPercentage: 0.4,
        categoryPercentage: 0.6,
      },
      {
        label: 'Closed',
        backgroundColor: '#04942b',
        data: [],
        barPercentage: 0.4,
        categoryPercentage: 0.6,
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
        display: false,
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
      const isMobile = window.innerWidth <= 768;
      options.maintainAspectRatio = !isMobile;
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
        const response = await fetch(`${BASE_URL}/projects/chartProject`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();

        const totalProjects = responseData.departmentCounts.map(item => item.totalProjects);
        const closedProjects = responseData.departmentCounts.map(item => item.closedProjects);

        setData(prevData => ({
          labels: ['FIN','STR','QLT','MAN'],
          datasets: [
            {
              ...prevData.datasets[0],
              data: totalProjects,
            },
            {
              ...prevData.datasets[1],
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
    <section className="chart-container">
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default BarChart;
