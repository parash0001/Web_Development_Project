import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesReport = () => {
  const [salesData, setSalesData] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });

  const [initialSales, setInitialSales] = useState(0);
  const [lastCheckedTime, setLastCheckedTime] = useState(Date.now());
  const [initialDailySales, setInitialDailySales] = useState(0);
  const [initialWeeklySales, setInitialWeeklySales] = useState(0);
  const [initialMonthlySales, setInitialMonthlySales] = useState(0);
  const [initialYearlySales, setInitialYearlySales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reports/sales');
        const currentTotalSales = response.data.totalSales;

        // Check if total sales have increased
        if (currentTotalSales > 0 && initialSales === 0) {
          setInitialSales(currentTotalSales);
          setLastCheckedTime(Date.now());
        } else if (currentTotalSales > initialSales) {
          const elapsedTime = Date.now() - lastCheckedTime;

          // Daily Sales Calculation
          if (elapsedTime >= 12 * 60 * 60 * 1000) { // 12 hours in milliseconds
            const dailySales = currentTotalSales - initialSales;
            setSalesData(prevData => ({
              ...prevData,
              daily: prevData.daily + dailySales,
            }));
            setInitialSales(currentTotalSales); // Reset initial sales
            setLastCheckedTime(Date.now()); // Reset timestamp
            setInitialDailySales(currentTotalSales);
          }

          // Weekly Sales Calculation
          if (elapsedTime >= 7 * 24 * 60 * 60 * 1000) { // 7 days in milliseconds
            const weeklySales = currentTotalSales - initialWeeklySales;
            setSalesData(prevData => ({
              ...prevData,
              weekly: prevData.weekly + weeklySales,
            }));
            setInitialWeeklySales(currentTotalSales); // Reset weekly sales
          }

          // Monthly Sales Calculation
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          if (new Date(lastCheckedTime) < lastMonth) { // Check if a month has passed
            const monthlySales = currentTotalSales - initialMonthlySales;
            setSalesData(prevData => ({
              ...prevData,
              monthly: prevData.monthly + monthlySales,
            }));
            setInitialMonthlySales(currentTotalSales); // Reset monthly sales
          }

          // Yearly Sales Calculation
          const lastYear = new Date();
          lastYear.setFullYear(lastYear.getFullYear() - 1);
          if (new Date(lastCheckedTime) < lastYear) { // Check if a year has passed
            const yearlySales = currentTotalSales - initialYearlySales;
            setSalesData(prevData => ({
              ...prevData,
              yearly: prevData.yearly + yearlySales,
            }));
            setInitialYearlySales(currentTotalSales); // Reset yearly sales
          }
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    const intervalId = setInterval(fetchSalesData, 1000 * 60 * 5); // Check every 5 minutes
    return () => clearInterval(intervalId);
  }, [initialSales, lastCheckedTime, initialDailySales, initialWeeklySales, initialMonthlySales, initialYearlySales]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Sales Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Daily Sales</h2>
          <p className="text-gray-700 text-2xl">Npr {salesData.daily}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Weekly Sales</h2>
          <p className="text-gray-700 text-2xl">Npr {salesData.weekly}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Monthly Sales</h2>
          <p className="text-gray-700 text-2xl">Npr {salesData.monthly}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Yearly Sales</h2>
          <p className="text-gray-700 text-2xl">Npr {salesData.yearly}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
