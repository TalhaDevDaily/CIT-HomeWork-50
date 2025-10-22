import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie";

const RegLayout = () => {
  const navigate = useNavigate();

  const tokenCookies = Cookies.get("Authorization");
  console.log(tokenCookies);
  useEffect(() => {
    !tokenCookies && navigate("/login");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RegLayout;
