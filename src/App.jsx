import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Register from "./components/Register";

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
      <RouterProvider router={pageRouting}></RouterProvider>
    </>
  );
};

export default App;
