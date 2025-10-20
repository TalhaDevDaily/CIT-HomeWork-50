import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

const Register = () => {
  const [mode, setMode] = useState("dark");

  const entireHTML = document.querySelector("html");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      entireHTML.classList.add("dark");
      setMode("dark");
    } else {
      entireHTML.classList.remove("dark");
      setMode("light");
    }
  }, []);

  const handleBtn = () => {
    entireHTML.classList.toggle("dark");
    const isDark = entireHTML.classList.contains("dark");
    if (isDark) {
      localStorage.setItem("theme", "dark");
      setMode("dark");
    } else {
      localStorage.setItem("theme", "light");
      setMode("light");
    }
  };

  const [formData, setFormData] = useState({
    email: null,
    password: null,
    role: "ADMIN",
    username: null,
    confirmPass: null,
  });

  const [allErrors, setAllErrors] = useState({
    emailError: "border-gray-300",
    passwordError: "border-gray-300",
    usernameError: "border-gray-300",
    confirmPassError: "border-gray-300",
  });

  //   ------------------------------ Submit Handler
  const handleRegister = (e) => {
    e.preventDefault();

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
        toast.success("Registeration Successful!", {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#090040] p-6 relative">
      <button
        onClick={handleBtn}
        className="absolute top-10 right-10 bg-indigo-600 dark:bg-[#B13BFF] text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors"
      >
        Dark
      </button>

      <div className="w-full max-w-md bg-white dark:bg-[#471396] rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-[#B13BFF] text-center">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-white text-center">
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

            <button
              type="submit"
              className="w-full mt-1 bg-indigo-600 dark:bg-[#B13BFF] text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Register
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <span className="dark:text-white">Already have an account?</span>
            <button
              type="button"
              className="ml-2 text-indigo-600 dark:text-[#B13BFF] font-medium hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
