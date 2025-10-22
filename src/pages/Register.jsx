import axios from "axios";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import { Bounce, toast } from "react-toastify";

const Register = () => {
  // Dealing with Loading API
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Form Data Handling
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    role: "ADMIN",
    username: null,
    confirmPass: null,
  });

  // Error Handling
  const [allErrors, setAllErrors] = useState({
    emailError: "border-gray-300",
    passwordError: "border-gray-300",
    usernameError: "border-gray-300",
    confirmPassError: "border-gray-300",
  });

  //   ------------------------------ Submit Handler: conditions
  const handleRegister = (e) => {
    e.preventDefault(); // Preventing the Form to reload the page

    if (!formData.username) {
      setAllErrors((prev) => ({ ...prev, usernameError: "border-red-500" }));
    }

    if (!formData.email) {
      setAllErrors((prev) => ({ ...prev, emailError: "border-red-500" }));
    }

    if (!formData.password) {
      setAllErrors((prev) => ({ ...prev, passwordError: "border-red-500" }));
    }

    if (!formData.confirmPass) {
      setAllErrors((prev) => ({
        ...prev,
        confirmPassError: "border-red-500",
      }));
    }

    if (formData.password != formData.confirmPass)
      return setAllErrors((prev) => ({
        ...prev,
        passwordError: "border-red-500",
        confirmPassError: "border-red-500",
      }));

    setIsLoading(true);

    // Fetching Registeration Authentication API from
    axios
      .post(
        "https://api.freeapi.app/api/v1/users/register",
        {
          email: formData.email,
          password: formData.password,
          role: "ADMIN",
          username: formData.username,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        // Navigate to Login
        // navigate("/login");
        // Toastify NPM - Successful
        toast.success("Registeration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        // Toastify NPM - Unsuccessful
        toast.error("Registeration unsuccessful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Sign up to get started
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
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div
                className={`flex items-center border ${allErrors.emailError} rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500`}
              >
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));

                    setAllErrors((prev) => ({
                      ...prev,
                      emailError: "border-gray-300",
                    }));
                  }}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
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

            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <div
                className={`flex items-center border ${allErrors.confirmPassError} rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500`}
              >
                <FaLock className="text-gray-400 mr-3" />
                <input
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      confirmPass: e.target.value,
                    }));

                    setAllErrors((prev) => ({
                      ...prev,
                      confirmPassError: "border-gray-300",
                    }));
                  }}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-type the password"
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
                Register
              </button>
            )}
          </form>

          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <span>Already have an account?</span>
            <Link
              to={"/login"}
              className="ml-2 text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
