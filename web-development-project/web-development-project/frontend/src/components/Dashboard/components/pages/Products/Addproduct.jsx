import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import * as yup from "yup";

// Define the validation schema
const kitchenSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup
    .string()
    .oneOf([
      "APPETIZER",
      "MAIN_COURSE",
      "DESSERT",
      "BEVERAGE",
      "SNACK",
      "SALAD",
      "SOUP",
      "SIDE_DISH",
      "BREAKFAST",
      "LUNCH",
      "DINNER",
      "SPECIAL",
    ])
    .required("Category is required"),
  type: yup
    .string()
    .oneOf(["VEGETARIAN", "NON_VEGETARIAN", "VEGAN"])
    .required("Type is required"),
  price: yup.number().required("Price is required").positive(),
});

const AddFood = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(kitchenSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", {
          autoClose: 1000,
        });
        return;
      }

      const payload = {
        name: data.name,
        price: data.price.toString(),
        category: data.category,
        type: data.type,
        image: "null",
      };

      const response = await axios.post(
        "http://localhost:8080/api/menu/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Food added successfully!", {
        autoClose: 1000,
      });
      reset();
    } catch (error) {
      toast.error("Error adding food!", {
        autoClose: 1000,
      });
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="max-w-4xl p-8">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-2">Add Menu Item</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Menu Item Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              {...register("category")}
              id="category"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Category</option>
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
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="mb-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              {...register("type")}
              id="type"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Type</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian</option>
              <option value="VEGAN">Vegan</option>
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div>

          <div className="mb-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              {...register("price")}
              type="number"
              id="price"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
