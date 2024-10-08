import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                label: 'Categories',
                data: data.map(item => item.count),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'
                ],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;
