import React, { useState, useEffect } from 'react';
import { fetchTransactions, fetchStatistics, fetchBarChart, fetchPieChart } from './services/api';
import TransactionsTable from './components/TransactionsTable';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
    const [month, setMonth] = useState('March');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
    
        const fetchData = async () => {
            const transactionsData = await fetchTransactions(month);
            const statisticsData = await fetchStatistics(month);
            const barChartData = await fetchBarChart(month);
            const pieChartData = await fetchPieChart(month);

            setTransactions(transactionsData);
            setStatistics(statisticsData);
            setBarData(barChartData);
            setPieData(pieChartData);
        };

        fetchData();
    }, [month]);

    return (
        <div className="App">
            <h1>Transactions Dashboard</h1>
            <select onChange={(e) => setMonth(e.target.value)} value={month}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                {}
            </select>

            <TransactionsTable transactions={transactions} />
            <div>
                <h2>Statistics</h2>
                <p>Total Sales: {statistics.totalSales}</p>
                <p>Total Sold Items: {statistics.soldItems}</p>
                <p>Total Not Sold Items: {statistics.notSoldItems}</p>
            </div>

            <BarChart data={barData} />
            <PieChart data={pieData} />
        </div>
    );
}

export default App;
