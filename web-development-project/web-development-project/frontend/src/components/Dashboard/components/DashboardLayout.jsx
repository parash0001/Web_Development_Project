import React, { useEffect, useCallback, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ImSpinner9 } from "react-icons/im";

const Sidebar = lazy(() => import("./Sidebar/Sidebar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));



const AddRoom = lazy(() => import("./pages/Room Reservation/AddRoom"));

const AddUser = lazy(() => import("./pages/User/AddUser"));
const AddOrder = lazy(() => import("./pages/Order/AddOrder"));



const ListAllRoomReservation = lazy(() =>
  import("./pages/Room Reservation/ListAllRoomsReservation")
);


const ListAllUser = lazy(() => import("./pages/User/ListAllUser"));
const ListAllProducts = lazy(() => import("./pages/Products/ListAllProducts"));
const ListAllOrder = lazy(() => import("./pages/Order/ListAllOrder"));
const AddProduct = lazy(() => import("./pages/Products/Addproduct"));


const DashboardLayout = ({ route }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true }); // Navigate to login page and replace current URL
    }
  }, [isAuthenticated, navigate]);

  const renderComponent = useCallback(() => {
    switch (route) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesReport />;
      case 'add-food':
        return <AddFood />;
      case 'list-food':
        return <ListAllFood />;
      case 'add-room-category':
        return <AddRoomCategory />;
      case 'list-room-category':
        return <ListAllRoomCategory />;
      case 'add-room':
        return <AddRoom />;
      case 'list-room-reservation':
        return <ListAllRoomReservation />;
      case 'add-event':
        return <AddEvent />;
      case 'list-event':
        return <ListAllEvent />;
      case 'add-user':
        return <AddUser />;
      case 'list-user':
        return <ListAllUser />;
      case 'add-order':
        return <AddOrder />;
      case 'list-order':
        return <ListAllOrder />;
      case 'add-product':
        return <AddProduct />;
      case 'list-product':
        return <ListAllProducts />;
      case 'add-categories':
        return <AddCategory />;
      case 'list-all-categories':
        return <ListCategory />;
      case 'user-review':
        return <Testimonials />;
      case '/web/manage-landing-page-image':
        return <LandingPageContent />;
      case '/web/manage-about-us-content':
        return <AboutUsContent />;
      default:
        return null;
    }
  }, [route]);

  return (
    <>
      <Sidebar />
      <div className="p-2 sm:ml-64 bg-gray-100 relative">
        <div className="p-4 rounded-lg mt-14">
          {/* Your Suspense and component rendering */}
          <React.Suspense fallback={<ImSpinner9 />}>
            {renderComponent()}
          </React.Suspense>

          {/* Copyright text */}
          {/* <div className="absolute bottom-0 left-0 right-0 text-center text-gray-500 text-sm">
            &copy; 2024 Munal IT Solutions. All rights reserved.
          </div> */}
        </div>
      </div>

    </>
  );
};

export default DashboardLayout;
