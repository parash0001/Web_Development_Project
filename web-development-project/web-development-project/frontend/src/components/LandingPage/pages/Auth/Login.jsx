import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../../Dashboard/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );


      const { token, user } = response.data;
      const { role, username, email: userEmail } = user; 

      localStorage.setItem("jwtToken", token);
      sessionStorage.setItem("jwtToken", token);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("userRole", role);

      login(role, username, userEmail);
      toast.success("Login successful!", {
        autoClose: 500, 
      });

      // Navigate based on role
      if (role === "Admin") {
        navigate("/dashboard");
      } else if (role === "Staff") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen m-0 p-0 pt-[80px] bg-slate-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-sm shadow-indigo-600 md:mt-0 sm:max-w-md xl:p-0 border-t-4 border-t-indigo-600">
            <div className="p-6 space-y-3 md:space-y-5 sm:p-8">
              <div>
                <h1 className="text-2xl text-center py-4 font-serif font-bold">
                  Hotel King
                </h1>
              </div>
              <hr />
              <h6 className="text-lg text-center leading-tight tracking-tight text-gray-500 md:text-xl">
                Sign in to your account
              </h6>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div className="flex items-center">
                  <input
                    type="email"
                    name="email"
                    className="w-full border outline-none border-gray-300 text-gray-900 rounded-l-md block p-2.5"
                    placeholder="Enter Email Address"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <div className="w-14 p-3 border-y border-y-gray-300 border-r border-r-gray-300 rounded-r-lg block bg-slate-100">
                    <IoMail className="text-xl text-gray-600 mx-auto" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full border outline-none border-gray-300 text-gray-600 rounded-l-md block p-2.5"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <div className="w-14 p-3 border-y border-y-gray-300 border-r border-r-gray-300 rounded-r-lg block bg-slate-100">
                    <FaLock className="text-xl text-gray-600 mx-auto" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to=""
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don't have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
