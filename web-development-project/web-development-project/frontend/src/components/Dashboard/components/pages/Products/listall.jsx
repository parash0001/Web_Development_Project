import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editFood, setEditFood] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          toast.error("Unauthorized access. Please log in.", {
            autoClose: 1000,
          });
          return;
        }

        const response = await axios.get("http://localhost:8080/api/menu/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = response.data;
        console.log(result);

        if (Array.isArray(result)) {
          setFoods(result);
          setFilteredFoods(result);
        } else if (Array.isArray(result.data)) {
          setFoods(result.data);
          setFilteredFoods(result.data);
        } else {
          console.error("Invalid data format received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    if (filterCategory === "") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(
        (food) =>
          food.category &&
          food.category.toLowerCase() === filterCategory.toLowerCase()
      );
      setFilteredFoods(filtered);
    }
  }, [foods, filterCategory]);

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleEditFood = (food) => {
    setEditFood({
      _id: food._id,
      name: food.name,
      price: food.price,
      category: food.category,
      type: food.type,
    });
  };

  const handleSaveFood = async () => {
    // console.log("editFood object before saving:", editFood);
    console.log("Sending PUT request for food with ID:", editFood._id);

    if (!editFood || !editFood._id) {
      toast.error("Invalid food item for editing.", { autoClose: 1000 });
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", { autoClose: 1000 });
        return;
      }

      const updatedFood = {
        name: editFood.name,
        price: editFood.price,
        category: editFood.category,
        type: editFood.type,
        image: "null",
      };

      console.log("Sending PUT request for food with ID:", editFood._id);

      const response = await axios.put(
        `http://localhost:8080/api/menu/${editFood._id}`,
        updatedFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedFoods = foods.map((food) =>
          food._id === editFood._id ? { ...food, ...updatedFood } : food
        );
        setFoods(updatedFoods);
        setFilteredFoods(updatedFoods);
        setEditFood(null);
        toast.success("Food item updated successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to update food item.", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("Error updating food item.", { autoClose: 1000 });
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", {
          autoClose: 1000,
        });
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/menu/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const updatedFoods = foods.filter((food) => food._id !== foodId);
        setFoods(updatedFoods);
        setFilteredFoods(updatedFoods);
        toast.success("Food item deleted successfully!", {
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to delete food item.", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Error deleting food item.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="max-w-8xl p-8">
      <h1 className="text-2xl font-semibold mb-6">Products List</h1>

      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          name="categoryFilter"
          value={filterCategory}
          onChange={handleCategoryFilterChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          <option value="APPETIZER">Appetizer</option>
          <option value="MAIN_COURSE">Main Course</option>
          <option value="DESSERT">Dessert</option>
          <option value="BEVERAGE">Beverage</option>
          <option value="SNACK">Snack</option>
          <option value="SALAD">Salad</option>
          <option value="SOUP">Soup</option>
          <option value="SIDE_DISH">Side Dish</option>
          <option value="BREAKFAST">Breakfast</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
          <option value="SPECIAL">Special</option>
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
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Type
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <tr key={food._id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">{food.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {food.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {food.category}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{food.type}</td>
                <td className="px-4 py-2 text-center text-sm">
                  <button
                    onClick={() => handleEditFood(food)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFood(food._id)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Food</h2>
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
                value={editFood.name || ""}
                onChange={(e) =>
                  setEditFood({ ...editFood, name: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={editFood.price || ""}
                onChange={(e) =>
                  setEditFood({ ...editFood, price: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={editFood.category || ""}
                onChange={(e) =>
                  setEditFood({ ...editFood, category: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                value={editFood.type || ""}
                onChange={(e) =>
                  setEditFood({ ...editFood, type: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditFood(null)}
                className="px-3 py-1 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFood}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
