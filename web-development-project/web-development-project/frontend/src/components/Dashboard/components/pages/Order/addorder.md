import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddOrderForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    items: [{ menuItem: "", price: 0, quantity: 1 }],
    status: "",
    deliveryType: "",
    room: "",
    table: "",
    address: "",
    email: "", 
    phone: "", 
  });

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menu/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log("Fetched Menu Items:", response.data); // Log fetched data
      if (Array.isArray(response.data)) {
        setMenuItems(response.data);
      } else {
        console.error("Invalid response structure:", response.data);
        toast.error("Failed to fetch menu items. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error.message);
      toast.error("Failed to fetch menu items. Please try again later.");
    }
  };


  useEffect(() => {
    fetchMenuItems();
  }, []);


  

  const handleMenuItemChange = (index, menuItemId) => {
    const selectedMenuItem = menuItems.find(menuItem => menuItem.id === parseInt(menuItemId)); // Use id
    if (selectedMenuItem) {
      const updatedItems = [...formData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        menuItem: selectedMenuItem.id,
        price: selectedMenuItem.price,
      };
      setFormData({
        ...formData,
        items: updatedItems,
      });
      calculateTotalPrice();
    } else {
      console.error("Menu item not found");
    }
  };




  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { menuItem: "", price: 0, quantity: 1 }
      ],
    });
    calculateTotalPrice();
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    formData.items.forEach(item => {
      const menuItem = menuItems.find(menuItem => menuItem.id === item.menuItem); // Use id
      if (menuItem) {
        totalPrice += menuItem.price * item.quantity; // Calculate price based on the selected item
      }
    });
    setTotalPrice(totalPrice);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith('quantity')) {
      const updatedItems = [...formData.items];
      const itemIndex = parseInt(name.split('-')[1], 10);
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity: parseInt(value, 10),
      };
      setFormData({
        ...formData,
        items: updatedItems,
      });
      calculateTotalPrice();
    } else if (name === 'room' && formData.deliveryType === 'RoomService') {
      setFormData({
        ...formData,
        room: value.trim(),
      });
    } else if (name === 'table' && formData.deliveryType === 'Hotel') {
      setFormData({
        ...formData,
        table: value.trim(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.");
        return;
      }

      let roomOrTable = "";
      if (formData.deliveryType === "RoomService") {
        roomOrTable = formData.room; // Use the room number directly
      } else if (formData.deliveryType === "Hotel") {
        roomOrTable = formData.table; // Use the table number directly
      }

      // Prepare order data with menu item names
      const orderData = {
        items: formData.items.map(item => {
          const menuItem = menuItems.find(menuItem => menuItem.id === item.menuItem);
          return {
            menuItem: item.menuItem, // This should be the ID of the menu item
            name: menuItem ? menuItem.name : "",
            price: item.price,
            quantity: item.quantity,
            category: menuItem ? menuItem.category : null, // Ensure category is included
          };
        }),
        status: formData.status || "",
        deliveryType: formData.deliveryType || "",
        room: formData.deliveryType === "RoomService" ? formData.room : "",
        table: formData.deliveryType === "Hotel" ? formData.table : "",
        address: formData.deliveryType === "HomeDelivery" ? formData.address || "" : "",
        email: formData.deliveryType === "HomeDelivery" ? formData.email || "" : "",
        phone: formData.deliveryType === "HomeDelivery" ? formData.phone || "" : "",
        totalPrice: totalPrice,
      };

      const response = await axios.post(
        "http://localhost:8080/api/menu/add",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(orderData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Order submitted successfully!");
        reset();
      } else {
        console.error("Order submission failed:", response);
        toast.error("Failed to submit order. Please try again later.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error("Network error. Please check your internet connection.");
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };


  const reset = () => {
    setFormData({
      items: [{ menuItem: "", price: 0, quantity: 1 }],
      status: "",
      deliveryType: "",
      room: "",
      table: "",
      address: "",
    });
    setTotalPrice(0);
  };

  const handleCancel = () => {
    reset();
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({
      ...formData,
      items: updatedItems,
    });
    calculateTotalPrice();
  };
  useEffect(() => {
    console.log("Form Data Items:", formData.items);
  }, [formData.items]);


  return (
    <div className="max-w-4xl p-8" style={{ height: "82vh" }}>
      <h1 className="text-3xl font-semibold mb-6">Add Order</h1>
      <form onSubmit={onSubmit}>
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        {formData.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <div>
              <label htmlFor={`menuItem-${index}`} className="block text-sm font-medium text-gray-700">
                Menu Item
              </label>
              <select
                name={`menuItem-${index}`}
                id={`menuItem-${index}`}
                value={item.menuItem}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => handleMenuItemChange(index, e.target.value)}
              >
                <option value="">Select Menu Item</option>
                {menuItems.map((menuItem) => (
                  <option key={menuItem.id} value={menuItem.id}>
                    {menuItem.name}
                  </option>
                ))}
              </select>



            </div>
            <div>
              <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id={`price-${index}`}
                name={`price-${index}`}
                value={item.price}
                readOnly
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                value={item.quantity}
                onChange={(e) => handleInputChange(e, index)}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Item
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
            Total Price
          </label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            value={totalPrice}
            readOnly
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) => handleInputChange(e)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700">
            Delivery Type
          </label>
          <select
            id="deliveryType"
            name="deliveryType"
            value={formData.deliveryType}
            onChange={(e) => handleInputChange(e)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Delivery Type</option>
            <option value="RoomService">Room Service</option>
            <option value="HomeDelivery">Home Delivery</option>
            <option value="Hotel">Hotel</option>
          </select>
        </div>

        {formData.deliveryType === "RoomService" && (
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700">
              Room Number
            </label>
            <input
              type="text"
              id="room"
              name="room"
              value={formData.room}
              onChange={(e) => handleInputChange(e)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {formData.deliveryType === "Hotel" && (
          <div className="mb-4">
            <label htmlFor="table" className="block text-sm font-medium text-gray-700">
              Table Number
            </label>
            <input
              type="text"
              id="table"
              name="table"
              value={formData.table}
              onChange={(e) => handleInputChange(e)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {/* 
// Add email and phone input fields in the form */}
        {formData.deliveryType === "HomeDelivery" && (
          <>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange(e)}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required // Optional, depending on your validation requirements
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange(e)}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required // Optional, depending on your validation requirements
              />
            </div>
          </>
        )}


        <div className="flex justify-between">

          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Order
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddOrderForm;
