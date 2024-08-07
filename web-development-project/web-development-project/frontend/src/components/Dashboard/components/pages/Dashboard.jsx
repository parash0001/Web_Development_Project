import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [sales, setSales] = useState([]);
  const [tableOccupied, setTableOccupied] = useState({ current: 0, total: 10 }); // Assuming total tables are 10
  const [roomReserved, setRoomReserved] = useState({ current: 0, total: 0 });
  const [totalSales, setTotalSales] = useState(0);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwtToken');

      try {
        const productsRes = await axios.get('http://localhost:8080/api/menu/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const usersRes = await axios.get('http://localhost:8080/api/user/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersRes = await axios.get('http://localhost:8080/api/order/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const salesRes = await axios.get('http://localhost:8080/api/reports/sales', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const roomReservedRes = await axios.get('http://localhost:8080/api/room/reservation/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTotalSales(salesRes.data.totalSales);

        // Process products
        setProducts(productsRes.data.data.length);

        // Process users
        setUsers(usersRes.data.users.length);

        // Process today's orders
        // Getting today's date
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Counting today's orders
        const todaysOrders = Array.isArray(ordersRes.data.data)
          ? ordersRes.data.data.filter(order => new Date(order.createdAt).toISOString().split('T')[0] === today).length
          : 0;

        setOrders(todaysOrders);

        console.log(ordersRes.data); // Log the fetched orders



        // Process sales data
        setSales(salesRes.data);

        // Process room reservations
        setRoomReserved({
          current: roomReservedRes.data.length,
          total: 20
        });

      } catch (error) {
        console.error('Error fetching dashboard data', error);
        setError('Error fetching dashboard data');
      }
    };

    fetchData();
  }, []);

  const salesChartData = {
    labels: Array.isArray(sales) ? sales.map(item => item.month) : [],
    datasets: [
      {
        label: 'Sales',
        data: Array.isArray(sales) ? sales.map(item => item.total) : [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {/* Card for Total Products */}
        <div className="dashboard-card">
          <a
            href="#"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-default flex items-center"
            style={{ height: "8rem" }}
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <img
                src="src/assets/img/Dashboard/products.png"
                alt="icon"
                width={50}
                height={50}
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <div className="text-left ml-4">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Products
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                {products}
              </p>
            </div>
          </a>
        </div>

        {/* Card for Registered Users */}
        <div className="dashboard-card">
          <a
            href="#"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-default flex items-center"
            style={{ height: "8rem" }}
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <img
                src="src/assets/img/Dashboard/users.png"
                alt="icon"
                width={50}
                height={50}
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <div className="text-left ml-4">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Registered Users
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                {users}
              </p>
            </div>
          </a>
        </div>

        {/* Card for Today's Orders */}
        <div className="dashboard-card">
          <a
            href="#"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-default flex items-center"
            style={{ height: "8rem" }}
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <img
                src="src/assets/img/Dashboard/orders.png"
                alt="icon"
                width={50}
                height={50}
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <div className="text-left ml-4">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Today's Orders
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                {orders}
              </p>
            </div>
          </a>
        </div>

        {/* Card for Tables Occupied */}
        <div className="dashboard-card">
          <a
            href="#"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-default flex items-center"
            style={{ height: "8rem" }}
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <img
                src="src/assets/img/Dashboard/table-occupied.png"
                alt="icon"
                width={50}
                height={50}
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <div className="text-left ml-4">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tables Occupied
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                {tableOccupied.current}/{tableOccupied.total}
              </p>
            </div>
          </a>
        </div>

        {/* Card for Rooms Reserved */}
        <div className="dashboard-card">
          <a
            href="#"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-default flex items-center"
            style={{ height: "8rem" }}
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <img
                src="src/assets/img/Dashboard/room-reserved.png"
                alt="icon"
                width={50}
                height={50}
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <div className="text-left ml-4">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Rooms Reserved
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                {roomReserved.current}/{roomReserved.total}
              </p>
            </div>
          </a>
        </div>

        {/* Card for Total Sales */}
        <div className="dashboard-card">
          <a
            href="#"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-default flex items-center"
            style={{ height: "8rem" }}
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <img
                src="src/assets/img/Dashboard/sales.png"
                alt="icon"
                width={50}
                height={50}
                style={{ filter: 'invert(1)' }}
              />
            </div>
            <div className="text-left ml-4">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Sales
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                Npr {totalSales}
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Error handling */}
      {error && (
        <div className="text-red-600 dark:text-red-400 text-center mt-4">
          {error}
        </div>
      )}

      {/* Chart displaying sales data */}
      <div className="dashboard-card p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Line data={salesChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
