import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid Email Address"),
  password: yup
    .string()
    .required("Password is required")
    .trim()
    .min(8, "Password should be at least 8 characters long."),
  isAdmin: yup.boolean().default(false),
  role: yup
    .string()
    .oneOf(["Staff", "Admin", "Guest", "Customer"])
    .required("Role is required"),
});
const handleCancel = () => {
  reset();
  setImage(null);
  setImagePreview(null);
};

const AddUserForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(userSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      toast.error("Unauthorized access. Please log in.", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/user/register", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("User added successfully!", {
        autoClose: 1000,
      });
      reset();
    } catch (error) {
      console.error("Error submitting form data:", error);
      if (error.response) {
        const { status, data: serverErrors } = error.response;

        if (status === 401) {
          toast.error("Unauthorized access. Please log in.", {
            autoClose: 1000,
          });
        } else {
          toast.error("Error submitting form data. Please try again.", {
            autoClose: 1000,
          });

          if (serverErrors.errors) {
            Object.keys(serverErrors.errors).forEach((key) => {
              if (key in userSchema.fields) {
                // Handle server-side validation errors
                console.log(serverErrors.errors[key]);
              }
            });
          }
        }
      }
    }
  };

  return (
    <div className="max-w-4xl p-8" style={{ height: "82vh" }}>
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-6">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              {...register("role")}
              id="role"
              name="role"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Guest">Guest</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

         
        </div>

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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
