import { Suspense, lazy } from "react";
import { FaSpinner } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/Dashboard/AuthContext";
import LoginRedirect from "./components/LandingPage/pages/Auth/LoginRedirect";
import ProtectedRoute from "./components/LandingPage/pages/Auth/ProtectedRoute";
const LandingPage = lazy(() =>
  import("./components/LandingPage/pages/LandingPage")
);
const Welcome = lazy(() => import("./components/LandingPage/pages/Welcome"));
const About = lazy(() => import("./components/LandingPage/pages/About"));
const Reservation = lazy(() =>
  import("./components/LandingPage/pages/Reservation")
);
const Contact = lazy(() => import("./components/LandingPage/pages/Contact"));
const Login = lazy(() => import("./components/LandingPage/pages/Auth/Login"));
const DashboardLayout = lazy(() =>
  import("./components/Dashboard/components/DashboardLayout")
);
const Register = lazy(() =>
  import("./components/LandingPage/pages/Auth/Register")
);

const BigSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <FaSpinner size={50} className="spinner" />
  </div>
);

const spinnerStyle = document.createElement("style");
spinnerStyle.innerHTML = `
  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<BigSpinner />}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/welcome" element={<Welcome className={""} />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <LoginRedirect>
                <Login />
              </LoginRedirect>
            }
          />
          <Route path="/register" element={<Register />} />
          {/* Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="dashboard" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales-report"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Staff"]}>
                <DashboardLayout route="sales" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/add-food"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-food" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/list-food"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-food" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/add-room-category"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-room-category" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/list-room-category"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-room-category" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roomreservation/add-room"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-room" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roomreservation/list-room-reservation"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-room-reservation" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventreservation/add-event"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-event" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventreservation/list-event"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-event" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/add-user"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-user" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/list-user"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-user" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/add-order"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-order" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/list-order"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-order" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/add-product"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-product" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/list-product"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-product" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/web/add-categories"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="add-categories" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/web/list-all-categories"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="list-all-categories" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="user-review" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/web/manage-landing-page-image"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="/web/manage-landing-page-image" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/web/manage-about-us-content"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <DashboardLayout route="/web/manage-about-us-content" />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
