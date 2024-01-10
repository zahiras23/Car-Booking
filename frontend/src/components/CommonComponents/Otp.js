import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailVerify } from "../../slices/User.slice";
import { Link, useNavigate } from "react-router-dom";
import { adminVerify } from "../../slices/Admin.slice";
import styles from "../Stylesheets/Otp.module.css";
import { driverVerify } from "../../slices/Driver.slice";
import Spinner from "../CommonComponents/Spinner";
import { forgotEmailVerify } from "../../slices/ForgotPassword.slice";

export default function Otp() {
  const [no1, setNo1] = useState("");
  const [no2, setNo2] = useState("");
  const [no3, setNo3] = useState("");
  const [no4, setNo4] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);
  const adminState = useSelector((state) => state.adminState);
  const driverState = useSelector((state) => state.driverState);
  const forgotPasswordState = useSelector(state => state.passwordState)

  let forgotPasswordPath = window.location.pathname;
  const role = localStorage.getItem("role")


  useEffect(() => {
    const email = localStorage.getItem('email')
    if (email === null) {
      navigate("/")
    }
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")
    if (token && role === "customer") {
      navigate("/")
    }
    else if (token && role === "driver") {
      navigate("/driver/home")
    }
    else if (token && role === "admin") {
      navigate("/adminHome")
    }
  }, [])


  useEffect(() => {
    if (userState.verifyStatus === "success") {
      if (window.location.pathname === "/otpVarifier") {
        navigate("/");
      }
    }
    else if (userState.verifyStatus === "rejected") {
      setLoading(false)
    }

  }, [userState]);

  useEffect(() => {
    if (adminState.verifyStatus === "success") {
      navigate("/adminHome");
    }
    if (adminState.verifyStatus === "rejected") {
      setLoading(false)
    }
  }, [adminState]);

  useEffect(() => {
    if (driverState.verifyStatus === "success") {
      navigate("/driver/home")
    }
    if (driverState.verifyStatus === "rejected") {
      setLoading(false)
    }
  }, [driverState]);

  //For forgot password
  useEffect(() => {
    if (forgotPasswordState.verifyStatus === 'success') {
      if (forgotPasswordPath === "/forgotPassword/otpVarifier") {
        navigate("/changeNewPassword");
      }
      else if (forgotPasswordPath === "/admin/forgotPassword/otpVarifier") {
        navigate("/admin/changeNewPassword")
      }
      else if (forgotPasswordPath === "/driver/forgotPassword/otpVarifier") {
        navigate("/driver/changeNewPassword")
      }
    }
    else if (forgotPasswordState.verifyStatus === 'rejected') {
      setLoading(false)
    }
  }, [forgotPasswordState])

  //submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const otp = no1 + no2 + no3 + no4
    const path = window.location.pathname
    if (path === '/forgotPassword/otpVarifier' || path === '/admin/forgotPassword/otpVarifier' || path === '/driver/forgotPassword/otpVarifier') {
      dispatch(forgotEmailVerify(otp))
      setLoading(true)
    }
    else if (path === "/adminHome/otpVarifier") {
      dispatch(adminVerify(otp));
      setLoading(true)
    }
    else if (path === "/driver/otpVerify") {
      dispatch(driverVerify(otp))
      setLoading(true)
    }
    else {
      dispatch(emailVerify(otp));
      setLoading(true)
    }
  };
  return (
    <>
      {loading ? <Spinner /> : <>
        <div style={{ backgroundColor: "rgba(234, 222, 222, 0.9)", minHeight: "100vh" }}>
          <div className="d-flex justify-content-center align-items-center container">
            <div className={`${styles.card} bg-light py-5 px-3`}>
              <span>
                Enter the code we just send on your Email{" "}
                <b className="text-primary">{localStorage.getItem("email")}</b>
              </span>
              <div className="d-flex flex-row mt-5" style={{ width: "300px" }}>
                <input type="text" className={`${styles.no} form-control`} autofocus="" onChange={(event => setNo1(event.target.value))} maxLength={1} />
                <input type="text" className={`${styles.no} form-control`} onChange={(event => setNo2(event.target.value))} maxLength={1} />
                <input type="text" className={`${styles.no} form-control`} onChange={(event => setNo3(event.target.value))} maxLength={1} />
                <input type="text" className={`${styles.no} form-control`} onChange={(event => setNo4(event.target.value))} maxLength={1} />
              </div>
              <button className={`${styles.btn} btn`} style={{ backgroundColor: "#F7752A" }} type="submit" onClick={handleSubmit}>
                Verify
              </button>
              <div className={` text-center mt-5`}>
                <span className=" mobile-text">
                  Don't receive the code?
                </span>
                <span className="font-weight-bold text-danger cursor"><Link to="/login">Resend</Link></span>
              </div>
            </div>
          </div>
        </div>
      </>}

    </>
  );
}