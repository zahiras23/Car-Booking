import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/User.slice";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../slices/Admin.slice";
import "../Stylesheets/spinner.css"
import Spinner from './Spinner'
import { logoutDriver } from "../../slices/Driver.slice";

const Logout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  const path = window.location.pathname;

  useEffect(() => {
    if (path === "/adminHome/logout") {
      dispatch(logoutAdmin());
      navigate("/")
    }
    else if (path === "/driver/logout") {
      dispatch(logoutDriver())
      navigate("/")
    }
    else {
      dispatch(logoutUser());
      navigate("/")
    }
  }, [dispatch]);


  return (
    <div>
      {loading && <Spinner />}
    </div>
  );
};

export default Logout;
