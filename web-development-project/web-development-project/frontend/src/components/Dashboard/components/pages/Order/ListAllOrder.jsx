import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [editOrder, setEditOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Unauthorized access. Please log in.", {
            autoClose: 1000,
          });
          return;
        }

        const ordersResponse = await axios.get(
          "http://localhost:8080/api/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Orders response:", ordersResponse.data);

        const ordersData = ordersResponse.data;
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.", {
          autoClose: 2000,
        });
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (filterStatus === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.status &&
          order.status.toLowerCase() === filterStatus.toLowerCase()
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

      const response = await axios.put(
        `http://localhost:4000/api/orders/${editOrder._id}`, // Updated to match your endpoint
        editOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        const updatedOrders = orders.map(
          (order) => (order._id === editOrder._id ? response.data : order) // Use the response data for the updated order
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

  const handleDeleteOrder = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", { autoClose: 1000 });
        return;
      }

      const response = await axios.delete(
        `http://localhost:4000/api/orders/${orderToDelete}`, // Updated to match your endpoint
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 204) {
        // No content indicates successful deletion
        const updatedOrders = orders.filter(
          (order) => order._id !== orderToDelete
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        toast.success("Order deleted successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to delete order.", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order.", { autoClose: 1000 });
    } finally {
      setIsConfirmDeleteOpen(false); // Close modal after operation
      setOrderToDelete(null);
    }
  };

  const openConfirmDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    setOrderToDelete(null);
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
      const key = name.split(".")[1]; // Get the key (name or quantity)

      setEditOrder((prevOrder) => {
        const newItems = [...prevOrder.items];
        newItems[index] = {
          ...newItems[index],
          [key]: value, // Update the specific field
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
        <label
          htmlFor="statusFilter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Items
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Delivery Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Room ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Table ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                {" "}
                {/* Updated key access */}
                <td className="px-4 py-2">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} - Quantity: {item.quantity}
                    </div>
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
                    onClick={() => openConfirmDeleteModal(order._id)}
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

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-lg font-semibold mb-4">Edit Order</h2>
        {/* Input fields for editing order. Map over items if necessary */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status:
          </label>
          <input
            type="text"
            name="status"
            value={editOrder?.status || ""}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        {/* Add more fields here as required */}
        <div className="mt-4">
          <button
            onClick={handleSaveOrder}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={closeModal}
            className="ml-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={isConfirmDeleteOpen}
        onRequestClose={closeConfirmDeleteModal}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this order?</p>
        <div className="mt-4">
          <button
            onClick={handleDeleteOrder}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeConfirmDeleteModal}
            className="ml-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderList;
