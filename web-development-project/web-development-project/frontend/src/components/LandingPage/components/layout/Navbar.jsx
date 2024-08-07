import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Dashboard/AuthContext"; // Adjust the path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    logout(); // This should handle clearing the token and updating the context
    navigate('/'); // Redirect to home or any other page after logout
  };

  return (
    <div className="mx-0 w-full h-[95px] flex justify-between px-14 items-center pt-4 text-center bg-slate-400 md:px-20 z-10 fixed top-0 left-0 right-0">
      <h1 className="text-white text-2xl font-serif font-bold">Hotel King</h1>
      <div className="text-white text-sm font-normal">
        <ul className="flex space-x-8">
          <li className="tracking-widest cursor-pointer">
            <NavLink to="/" className="hover:text-black">
              HOME
            </NavLink>
          </li>
          <li className="tracking-widest cursor-pointer">
            <NavLink to="/about" className="hover:text-black">
              ABOUT
            </NavLink>
          </li>
          <li className="tracking-widest cursor-pointer">
            <NavLink to="/reservation" className="hover:text-black">
              RESERVATION
            </NavLink>
          </li>
          <li className="tracking-widest cursor-pointer">
            <NavLink to="/contact" className="hover:text-black">
              CONTACT
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li className="tracking-widest cursor-pointer" onClick={handleLogoutClick}>
              <span className="hover:text-black">
                LOGOUT
              </span>
            </li>
          ) : (
            <li className="tracking-widest cursor-pointer" onClick={handleLoginClick}>
              <span className="hover:text-black">
                LOGIN
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
