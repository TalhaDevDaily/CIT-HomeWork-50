import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegLayout from "./layouts/RegLayout";

const App = () => {
  const pageRouting = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RegLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={pageRouting}></RouterProvider>
    </>
  );
};

export default App;
