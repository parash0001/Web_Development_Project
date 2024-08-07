import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [editRoom, setEditRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditRoom(null); // Reset editRoom state when modal closes
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Unauthorized access. Please log in.", {
            autoClose: 1000,
          });
          return;
        }

        const response = await axios.get("http://localhost:8080/reservations", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        const result = response.data.data;
        console.log(result);

        if (Array.isArray(result)) {
          setRooms(result);
          setFilteredRooms(result);
        } else {
          console.error("Invalid data format received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (filterType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.type && room.type.toLowerCase() === filterType.toLowerCase()
      );
      setFilteredRooms(filtered);
    }
  }, [rooms, filterType]);

  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleEditRoom = (room) => {
    setEditRoom(room);
    setIsModalOpen(true); // Open the modal when editing a room
  };

  const handleSaveRoom = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", {
          autoClose: 1000,
        });
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/reservations/${editRoom.id}`, // Adjust this if your API endpoint differs
        editRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedRooms = rooms.map((room) =>
          room.id === editRoom.id ? editRoom : room
        );
        setRooms(updatedRooms);
        setFilteredRooms(updatedRooms);
        setEditRoom(null);
        closeModal(); // Close modal after successful save
        toast.success("Room updated successfully!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to update room.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Error updating room.", {
        autoClose: 1000,
      });
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", {
          autoClose: 1000,
        });
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/reservations/${roomId}`, // Adjust this if your API endpoint differs
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedRooms = rooms.filter((room) => room.id !== roomId);
        setRooms(updatedRooms);
        setFilteredRooms(updatedRooms);
        toast.success("Room deleted successfully!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to delete room.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Error deleting room.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="max-w-8xl p-8">
      <h1 className="text-2xl font-semibold mb-6">Room List</h1>

      {/* Filter Section */}
      <div className="mb-4">
        <label
          htmlFor="typeFilter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by Type:
        </label>
        <select
          id="typeFilter"
          name="typeFilter"
          value={filterType}
          onChange={handleTypeFilterChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Types</option>

          <option value="DELUX_ROOM">Deluxe Room</option>
          <option value="AC_ROOM">AC Room</option>
          <option value="FOUR_BED_AC_ROOM">4 Bed AC Room</option>
          <option value="FOUR_BED_NON_AC_ROOM">4 Bed Non-AC Room</option>
          <option value="THREE_DOUBLE_BED_ROOM">3 Double Bed Room</option>
          <option value="TWO_DOUBLE_BED_ROOM">2 Double Bed Room</option>
          <option value="ONE_DOUBLE_ONE_SINGLE_BED_ROOM">1 Double, 1 Single Bed Room</option>
          <option value="ONE_MEDIUM_BED_ROOM">1 Medium Bed Room</option>
          <option value="THREE_SINGLE_BED_ROOM_AC">3 Single Bed Room AC</option>
        </select>
      </div>

      {/* Room List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Room Number
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Check-in Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Check-out Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{room.roomNumber}</td>
                <td className="px-4 py-2">{room.type}</td>
                <td className="px-4 py-2">{room.checkInDate}</td>
                <td className="px-4 py-2">{room.checkOutDate}</td>
                <td className="px-4 py-2">{room.email}</td>
                <td className="px-4 py-2">{room.phone}</td>
                <td className="px-4 py-2">{room.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditRoom(room)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="px-3 py-1 ml-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Room Form */}
      {editRoom && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Room"
          className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Room</h2>
            <div className="mb-4">
              <label
                htmlFor="roomNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Room Number
              </label>
              <input
                type="number"
                id="roomNumber"
                value={editRoom.roomNumber}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, roomNumber: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="checkInDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Check-in Date
              </label>
              <input
                type="date"
                id="checkInDate"
                value={editRoom.checkInDate}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, checkInDate: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="checkOutDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Check-out Date
              </label>
              <input
                type="date"
                id="checkOutDate"
                value={editRoom.checkOutDate}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, checkOutDate: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Room Type
              </label>
              <select
                id="type"
                value={editRoom.type}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, type: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >

                <option value="DELUX_ROOM">Deluxe Room</option>
                <option value="AC_ROOM">AC Room</option>
                <option value="FOUR_BED_AC_ROOM">4 Bed AC Room</option>
                <option value="FOUR_BED_NON_AC_ROOM">4 Bed Non-AC Room</option>
                <option value="THREE_DOUBLE_BED_ROOM">3 Double Bed Room</option>
                <option value="TWO_DOUBLE_BED_ROOM">2 Double Bed Room</option>
                <option value="ONE_DOUBLE_ONE_SINGLE_BED_ROOM">1 Double, 1 Single Bed Room</option>
                <option value="ONE_MEDIUM_BED_ROOM">1 Medium Bed Room</option>
                <option value="THREE_SINGLE_BED_ROOM_AC">3 Single Bed Room AC</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={editRoom.email}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, email: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={editRoom.phone}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, phone: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                value={editRoom.status}
                onChange={(e) =>
                  setEditRoom({ ...editRoom, status: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="PENDING">Pending</option>
                {/* Add other statuses if applicable */}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRoom}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-green-700 focus:outline-none ml-2"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoomList;
