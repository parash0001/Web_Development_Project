import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [editOrder, setEditOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          toast.error("Unauthorized access. Please log in.", { autoClose: 1000 });
          return;
        }

        const ordersResponse = await axios.get("http://localhost:8080/api/order/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const ordersData = ordersResponse.data.data;
        console.log("Orders:", ordersData);
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.", { autoClose: 2000 });
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (filterStatus === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.status && order.status.toLowerCase() === filterStatus.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
  }, [orders, filterStatus]);

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleEditOrder = (order) => {
    setEditOrder(order);
    setIsModalOpen(true);
  };

  const handleSaveOrder = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", { autoClose: 1000 });
        return;
      }

      // Use the correct way to access the ID based on your data structure
      const response = await axios.put(
        `http://localhost:8080/api/order/${editOrder._id}`,  // Updated this line
        editOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        const updatedOrders = orders.map(order =>
          order._id === editOrder._id ? editOrder : order // Updated this line
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        setIsModalOpen(false);
        setEditOrder(null);
        toast.success("Order updated successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to update order.", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order.", { autoClose: 1000 });
    }
  };


  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", { autoClose: 1000 });
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/order/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const updatedOrders = orders.filter(order => order._id.$oid !== orderId);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        toast.success("Order deleted successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to delete order.", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order.", { autoClose: 1000 });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditOrder(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested items
    if (name.startsWith("items[")) {
      const index = name.match(/\d+/)[0]; // Extract the index from the name
      const key = name.split('.')[1]; // Get the key (name or quantity)

      setEditOrder(prevOrder => {
        const newItems = [...prevOrder.items];
        newItems[index] = {
          ...newItems[index],
          [key]: value // Update the specific field
        };
        return { ...prevOrder, items: newItems }; // Update the order with new items
      });
    } else {
      setEditOrder({
        ...editOrder,
        [name]: value,
      });
    }
  };

  return (
    <div className="max-w-8xl p-8">
      <h1 className="text-2xl font-semibold mb-6">Order List</h1>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          name="statusFilter"
          value={filterStatus}
          onChange={handleStatusFilterChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Items</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Delivery Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Room ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Table ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>

            {filteredOrders.map(order => (
              <tr key={order._id.$oid} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {order.items.map(item => (
                    <div key={item.menuItem}>{item.name} - Quantity: {item.quantity}</div>
                  ))}
                </td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.deliveryType}</td>
                <td className="px-4 py-2">{order.room}</td>
                <td className="px-4 py-2">{order.table}</td>
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this order?")) {
                        handleDeleteOrder(order._id);
                      }
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Edit Modal */}
      {editOrder && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Order"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Order</h2>

            {/* Status Field */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
              <select
                name="status"
                value={editOrder.status}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Delivery Type Field */}
            <div className="mb-4">
              <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700 mb-1">Delivery Type:</label>
              <select
                name="deliveryType"
                value={editOrder.deliveryType}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="Home Delivery">Home Delivery</option>
                <option value="Room">Room</option>
                <option value="Table">Table</option>
              </select>
            </div>

            {/* Items Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Items:</label>
              {editOrder.items.map((item, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    name={`items[${index}].name`} // Use this format for dynamic names
                    value={item.name}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                    className="p-2 border border-gray-300 rounded-md mr-2"
                  />
                  <input
                    type="number"
                    name={`items[${index}].quantity`} // Use this format for dynamic quantities
                    value={item.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}

            </div>

            {/* Conditional Fields */}
            {editOrder.deliveryType === "Home Delivery" && (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editOrder.email}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editOrder.phone}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Home Delivery Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={editOrder.address}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}

            {editOrder.deliveryType === "Room" && (
              <div className="mb-4">
                <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">Room ID:</label>
                <input
                  type="text"
                  name="room"
                  value={editOrder.room}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            {editOrder.deliveryType === "Table" && (
              <div className="mb-4">
                <label htmlFor="table" className="block text-sm font-medium text-gray-700 mb-1">Table ID:</label>
                <input
                  type="text"
                  name="table"
                  value={editOrder.table}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOrder}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}




    </div>




  );
};

export default OrderList;
