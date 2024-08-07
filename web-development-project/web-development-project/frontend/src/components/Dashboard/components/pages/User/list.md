import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";

// Set the app element for accessibility
Modal.setAppElement("#root");

const UserList = () => {
const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);
const [filterRole, setFilterRole] = useState("");
const [editUser, setEditUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
const fetchUsers = async () => {
try {
const token = localStorage.getItem("jwtToken");
if (!token) {
toast.error("Unauthorized access. Please log in.", {
autoClose: 1000,
});
return;
}

        const response = await axios.get(
          "http://localhost:8080/api/user/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = response.data;
        console.log(result);

        if (Array.isArray(result.data)) {
          // Change here
          setUsers(result.data); // Change here
          setFilteredUsers(result.data); // Change here
        } else {
          console.error("Invalid data format received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

}, []);

useEffect(() => {
if (filterRole === "") {
setFilteredUsers(users);
} else {
const filtered = users.filter(
(user) =>
user.role && user.role.toLowerCase() === filterRole.toLowerCase()
);
setFilteredUsers(filtered);
}
}, [users, filterRole]);

const handleRoleFilterChange = (e) => {
setFilterRole(e.target.value);
};

const handleEditUser = (user) => {
setEditUser(user);
setIsModalOpen(true);
};

const handleSaveUser = async () => {
try {
const token = localStorage.getItem("jwtToken");
if (!token) {
toast.error("Unauthorized access. Please log in.", {
autoClose: 1000,
});
return;
}

      const response = await axios.put(
        `http://localhost:8080/api/user/admin/edit-user/${editUser.id}`,
        editUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedUsers = users.map((user) =>
          user.id === editUser.id ? editUser : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setEditUser(null);
        setIsModalOpen(false);
        toast.success("User updated successfully!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to update user.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.", {
        autoClose: 1000,
      });
    }

};

const handleDeleteUser = async (userId) => {
console.log(userId);
try {
const token = localStorage.getItem("jwtToken");
if (!token) {
toast.error("Unauthorized access. Please log in.", {
autoClose: 1000,
});
return;
}

      const response = await axios.delete(
        `http://localhost:8080/api/user/admin/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        toast.success("User deleted successfully!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to delete user.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user.", {
        autoClose: 1000,
      });
    }

};

const closeModal = () => {
setIsModalOpen(false);
setEditUser(null);
};

return (
<>
<ToastContainer />

      <div className="max-w-8xl p-8">
        <h1 className="text-2xl font-semibold mb-6">User List</h1>

        <div className="mb-4">
          <label
            htmlFor="roleFilter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Role:
          </label>
          <select
            id="roleFilter"
            name="roleFilter"
            value={filterRole}
            onChange={handleRoleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Roles</option>
            <option value="guest">Guest</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Is Admin
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
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

        {/* Edit User Modal */}
        {editUser && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Edit User"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="guest">Guest</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="isAdmin"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Is Admin
                </label>
                <select
                  id="isAdmin"
                  value={editUser.isAdmin ? "true" : "false"}
                  onChange={(e) =>
                    setEditUser({
                      ...editUser,
                      isAdmin: e.target.value === "true",
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>

);
};

export default UserList;
