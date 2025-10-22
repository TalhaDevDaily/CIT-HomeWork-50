import axios from "axios";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import { Bounce, toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  // Dealing with Loading API
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Form Data Handling
  const [formData, setFormData] = useState({
    password: null,
    username: null,
  });

  // Error Handling
  const [allErrors, setAllErrors] = useState({
    passwordError: "border-gray-300",
    usernameError: "border-gray-300",
  });

  // Axios API Data Fetching
  const options = {
    method: "POST",
    url: "https://api.freeapi.app/api/v1/users/login",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    data: formData,
  };

  //   ------------------------------ Submit Handler
  const handleRegister = (e) => {
    try {
      e.preventDefault(); // Preventing forced page reload from the form submit button

      if (!formData.username) {
        setAllErrors((prev) => ({ ...prev, usernameError: "border-red-500" }));
      }

      if (!formData.password) {
        return setAllErrors((prev) => ({
          ...prev,
          passwordError: "border-red-500",
        }));
      }

      setIsLoading(true);

      axios
        .request(options)
        .then((res) => {
          // Navigating to Home
          navigate("/");

          // Loading Stops
          setIsLoading(false);

          // Toastify NPM - Successful
          toast.success("Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          console.log(res.data.data.accessToken);

          Cookies.set("Authorization", res.data.data.accessToken);
        })
        .catch((error) => {
          // Loading Stops
          setIsLoading(false);
          // Toastify NPM - Unsuccessful
          toast.error("Invalid credentials", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Login
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Let's get started!
          </p>

          {/* onSubmit={(e) => e.preventDefault() */}
          <form className="mt-6 space-y-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div
                className={`flex items-center border ${allErrors.usernameError} rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500`}
              >
                <FaUser className="text-gray-400 mr-3" />
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));

                    setAllErrors((prev) => ({
                      ...prev,
                      usernameError: "border-gray-300",
                    }));
                  }}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div
                className={`flex items-center border ${allErrors.passwordError} rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500`}
              >
                <FaLock className="text-gray-400 mr-3" />
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));

                    setAllErrors((prev) => ({
                      ...prev,
                      passwordError: "border-gray-300",
                    }));
                  }}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {isLoading ? (
              <div
                type="submit"
                className="flex justify-center items-center w-full mt-1 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                <SyncLoader color={"#fff"} size={10} speedMultiplier={0.8} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full mt-1 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                Login
              </button>
            )}
          </form>

          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <span>Don't have an account?</span>
            <Link
              to={"/register"}
              className="ml-2 text-indigo-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
