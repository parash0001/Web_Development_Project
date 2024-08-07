import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'guest',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      navigate('/login');
      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('There was an error registering!', error);
    }
  };

  return (
    <div className="w-full h-screen m-0 p-0 pt-[80px] bg-slate-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-sm shadow-indigo-600 md:mt-0 sm:max-w-md xl:p-0 border-t-4 border-t-indigo-600">
          <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
            <div>
              <h1 className="text-2xl text-center py-4 font-serif font-bold">Hotel King</h1>
            </div>
            <hr />
            <h6 className="text-lg text-center leading-tight tracking-tight text-gray-500 md:text-xl">
              Register your account
            </h6>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="flex items-center">
                <input
                  type="text"
                  name="username"
                  className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                  placeholder="Enter Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                  placeholder="Enter Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full border outline-none border-gray-300 text-gray-600 rounded-l-md block p-2.5"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  name="dateOfBirth"
                  className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="firstName"
                  className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                  placeholder="Enter First Name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="lastName"
                  className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                  placeholder="Enter Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="phoneNumber"
                  className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                  placeholder="Enter Phone Number"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
