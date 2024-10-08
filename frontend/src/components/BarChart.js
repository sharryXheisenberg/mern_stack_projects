import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
    const chartData = {
        labels: [
            '0-100', '101-200', '201-300', '301-400', '401-500',
            '501-600', '601-700', '701-800', '801-900', '901+'
        ],
        datasets: [
            {
                label: 'Price Range',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default BarChart;
