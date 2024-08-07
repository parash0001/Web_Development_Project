import React, { Children, useState } from "react";

import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from "../../AuthContext"


const Sidebar = () => {

  const { isAuthenticated, logout, username, email } = useAuth();

  const handleLogout = () => {
    logout();
  };


  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isFoodDropdownOpen, setIsFoodDropdownOpen] = useState(false);
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [isRoomReservationDropdownOpen, setIsRoomReservationDropdownOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isWebDropdown, setIsWebDropdown] = useState(false);

  const dropdowns = {
    categories: setIsCategoriesDropdownOpen,
    food: setIsFoodDropdownOpen,
    room: setIsRoomDropdownOpen,
    roomReservation: setIsRoomReservationDropdownOpen,
    event: setIsEventDropdownOpen,
    products: setIsProductsDropdownOpen,
    user: setIsUserDropdownOpen,
    order: setIsOrderDropdownOpen,
    web: setIsWebDropdown,
  };

  const toggleDropdown = (dropdown) => {
    Object.keys(dropdowns).forEach((key) => {
      if (key !== dropdown && key !== 'food' && key !== 'room') {
        dropdowns[key](false);
      }
    });

    if (dropdown === 'food') {
      dropdowns.categories(true);
      dropdowns.room(false);

    }
    if (dropdown === 'room') {
      dropdowns.categories(true);
      dropdowns.food(false);
    }

    dropdowns[dropdown]((prevValue) => !prevValue);
  };

  const toggleRoomReservationDropdown = () => {
    toggleDropdown('roomReservation');
    dropdowns.food(false)
    dropdowns.room(false)
  };

  const toggleEventDropdown = () => {
    toggleDropdown('event');
    dropdowns.food(false)
    dropdowns.room(false)
  };

  const toggleProductsDropdown = () => {
    toggleDropdown('products');
    dropdowns.food(false)
    dropdowns.room(false)
  };

  const toggleOrderDropdown = () => {
    toggleDropdown('order');
    dropdowns.food(false)
    dropdowns.room(false)
  };

  const toggleUserDropdown = () => {
    toggleDropdown('user');
    dropdowns.food(false)
    dropdowns.room(false)
  };

  const toggleWebDropdown = () => {
    toggleDropdown('web');
    dropdowns.food(false)
    dropdowns.room(false)
  }


  const handleNavigation = () => {
    navigate('/dashboard');
    setTimeout(() => {
      window.location.reload();
    }, 100); // Adjust the delay as needed
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with your actual login state
  const navigate = useNavigate();

  const toggleNavDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ms-2 md:me-24 cursor-default">
                <img
                  src="#"
                  className="h-8 me-3"
                  alt="logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Hotel Management Dashboard
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleNavDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="src\assets\img\Dashboard\image.png"
                      alt="user photo"
                    />
                  </button>
                </div>
                {isDropdownOpen && isLoggedIn && (
                  <div
                    className="z-50 absolute mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                    style={{
                      right: '1rem',
                      top: '3.5rem',
                    }}
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {username}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                        {email}
                      </p>
                    </div>
                    <ul className="py-1 gap-y-18" role="none">




                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-50 bg-indigo-500 "
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 relative">
          <ul className="space-y-2 font-medium">
            <li>
              <div
                onClick={handleNavigation}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </div>
            </li>




            {/* room reservation dropdown code start  */}
            <ul>
              <li>
                <Link

                  onClick={toggleRoomReservationDropdown}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M21 10h-1V8c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v7h2v-2h16v2h2v-7c0-1.1-.9-2-2-2zM8 8h8v2H8V8zm8 4H8v-2h8v2zm-3-1h2v2h-2v-2z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Room Reservation
                  </span>
                  {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            3
          </span> */}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isRoomReservationDropdownOpen ? 'rotate-180' : ''
                      }`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </Link>
                {isRoomReservationDropdownOpen && (
                  <ul className="transition-all duration-300 ease-in-out transform max-h-48 overflow-y-auto opacity-100 py-2 space-y-2">
                    <li>
                      <Link
                        to="/roomreservation/add-room"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        Add a Room
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/roomreservation/list-room-reservation"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        List all Rooms
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>



            {/* room reservation dropdown code end  */}




            {/* product dropdown open here  */}
            <ul>
              <li>
                <Link

                  onClick={toggleProductsDropdown}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''
                      }`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </Link>
                {isProductsDropdownOpen && (
                  <ul className="transition-all duration-300 ease-in-out transform max-h-48 overflow-y-auto opacity-100 py-2 space-y-2">
                    <li>
                      <Link
                        to="/products/add-product"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        Add Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products/list-product"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        List all Products
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* product dropdown close here  */}


            <ul>
              <li>
                <Link

                  onClick={toggleOrderDropdown}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2H6ZM8 4H16V6H8V4ZM8 8H16V10H8V8ZM8 12H16V14H8V12ZM8 16H14V18H8V16Z" />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isOrderDropdownOpen ? 'rotate-180' : ''
                      }`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                {isOrderDropdownOpen && (
                  <ul className="transition-all duration-300 ease-in-out transform max-h-48 overflow-y-auto opacity-100 py-2 space-y-2">
                    <li>
                      <Link
                        to="/order/add-order"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        Take Order
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/order/list-order"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        List all Orders
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>




            {/* user list starts here  */}

            <ul>
              <li>
                <Link

                  onClick={toggleUserDropdown}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >

                  <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd" />
                  </svg>


                  <span className="flex-1 ms-3 whitespace-nowrap">User Management</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''
                      }`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                {isUserDropdownOpen && (
                  <ul className="transition-all duration-300 ease-in-out transform max-h-48 overflow-y-auto opacity-100 py-2 space-y-2">
                    <li>
                      <Link
                        to="/user/add-user"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        Add User
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/list-user"
                        className="flex items-center p-3 py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        List all Users
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>








          </ul>

        </div>
      </aside>


    </>
  );
};

export default Sidebar;
