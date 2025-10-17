import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";

const App = () => {
  const pageRouting = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Register />} />
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
