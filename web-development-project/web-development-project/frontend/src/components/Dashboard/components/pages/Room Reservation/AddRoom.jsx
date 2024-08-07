import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const AddRoomForm = () => {
  const roomDataSchema = yup.object().shape({
    roomNumber: yup.number().required("Room number is required"),
    type: yup
      .string()
      .required("Room type is required")
      .notOneOf([""], "Please select a room type"),
    checkInDate: yup.date().required("Check-in date is required"),
    checkOutDate: yup.date().required("Check-out date is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    status: yup
      .string()
      .required("Status is required")
      .notOneOf([""], "Please select a status"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(roomDataSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.", { autoClose: 1000 });
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/reservations",
        {
          roomNumber: data.roomNumber,
          type: data.type,
          checkInDate: new Date(data.checkInDate).toISOString(),
          checkOutDate: new Date(data.checkOutDate).toISOString(),
          email: data.email,
          phone: data.phone,
          status: data.status, // Use the selected status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Room added successfully!", { autoClose: 1000 });
        reset(); // Clear the form after successful submission
      } else {
        toast.error(
          response.data.message || "Failed to add room. Please check the data",
          { autoClose: 1000 }
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Failed to add room. Please check the data",
          { autoClose: 1000 }
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.", {
          autoClose: 1000,
        });
      } else {
        toast.error("Error in setting up the request. Please try again.", {
          autoClose: 1000,
        });
      }
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="max-w-4xl p-8" style={{ height: "82vh" }}>
      <h1 className="text-2xl font-semibold mb-6">Room Reservation Portal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="roomNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Room Number
            </label>
            <input
              {...register("roomNumber")}
              type="number"
              id="roomNumber"
              name="roomNumber"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.roomNumber && (
              <span className="text-red-500 text-sm">
                {errors.roomNumber.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
            >
              Room Type
            </label>
            <select
                {...register("type")}
                id="type"
                name="type"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Room Type</option>
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
            {errors.type && (
                <span className="text-red-500 text-sm">{errors.type.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
                htmlFor="checkInDate"
                className="block text-sm font-medium text-gray-700"
            >
              Check-in Date
            </label>
            <input
                {...register("checkInDate")}
                type="date"
                id="checkInDate"
                name="checkInDate"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.checkInDate && (
                <span className="text-red-500 text-sm">
                {errors.checkInDate.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
                htmlFor="checkOutDate"
                className="block text-sm font-medium text-gray-700"
            >
              Check-out Date
            </label>
            <input
              {...register("checkOutDate")}
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.checkOutDate && (
              <span className="text-red-500 text-sm">
                {errors.checkOutDate.message}
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
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              {...register("phone")}
              type="text"
              id="phone"
              name="phone"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              {...register("status")}
              id="status"
              name="status"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Status</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">{errors.status.message}</span>
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
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomForm;
