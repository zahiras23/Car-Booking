import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/User.slice";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../slices/Admin.slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginDriver } from "../../slices/Driver.slice";
import Spinner from "./Spinner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);
  const adminState = useSelector((state) => state.adminState);
  const driverState = useSelector((state) => state.driverState);

  let forgotPasswordUrl, signupUrl;

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "customer") {
      navigate("/");
    } else if (role === "admin") navigate("/adminHome");
    else if (role === "driver") {
      navigate("/driver/home");
    }
  }, [navigate]);

  const Urlpath = window.location.pathname;
  if (Urlpath === "/login") {
    forgotPasswordUrl = "/forgotPassword";
    signupUrl = "/signup";
  } else if (Urlpath === "/driver/login") {
    forgotPasswordUrl = "/driver/forgotPassword";
    signupUrl = "/driver/signup";
  } else if (Urlpath === "/adminHome/login") {
    forgotPasswordUrl = "/admin/forgotPassword";
  }

  useEffect(() => {
    if (userState.loginStatus === "success") {
      navigate("/otpVarifier");
    }
    if (
      userState.loginStatus === "rejected" ||
      adminState.loginStatus === "rejected" ||
      driverState.loginStatus === "rejected"
    ) {
      setLoading(false);
    }
    if (adminState.loginStatus === "success") {
      navigate("/adminHome/otpVarifier");
    }
    if (driverState.loginStatus === "success") {
      navigate("/driver/otpVerify");
    }
  }, [userState, adminState, driverState, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailExpression = /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (email.trim().length === 0 || !emailExpression.test(email)) {
      toast.error("Please Enter Valid Email.");
    } else if (password.trim().length <= 6) {
      toast.error("Password must have atleast 6 letters.");
    } else if (email.trim().length > 0 && password.trim().length > 0) {
      const userData = {
        email,
        password,
      };
      if (window.location.pathname === "/adminHome/login") {
        dispatch(loginAdmin(userData));
        setLoading(true);
      }
      if (window.location.pathname === "/driver/login") {
        dispatch(loginDriver(userData));
        setLoading(true);
      } else if (window.location.pathname === "/login") {
        dispatch(loginUser(userData));
        setLoading(true);
      }
    }
  };

  return (
    <>
      <br />
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={{ backgroundColor: "rgba(234, 222, 222, 0.9)" }}>
            <section>
              <div className="container py-4 mt-md-4">
                <div className="row h-100vh d-flex justify-content-center align-items-center">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card " style={{ borderRadius: "1rem" }}>
                      <div className="card-body p-2 text-center">
                        <div className="mb-md-3 mt-md-4 ">
                          <h5 className="fw-bold mb-2 text-uppercase">Login</h5>
                          {/* <p className=" mb-5">
                            Please enter your email and password!
                          </p> */}
                          <div
                            className="form-outline form-white mb-4"
                            align="center"
                          >
                            <input
                              type="email"
                              className="form-control w-75 p-2"
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="Email"
                              value={email}
                            />
                          </div>
                          <div
                            className="form-outline form-white mb-4"
                            align="center"
                          >
                            <input
                              type="password"
                              className="form-control w-75 p-2"
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              placeholder="Password"
                            />
                          </div>
                          <p className="small mb-1 pb-lg-2">
                            {" "}
                            <Link to={forgotPasswordUrl}>Forgot password?</Link>
                          </p>
                          <button
                            className="btn  px-3"
                            type="submit"
                            onClick={handleSubmit}
                            style={{ backgroundColor: "#F7752A" }}
                          >
                            Login
                          </button>
                          <br />
                          <br />
                          <p className="mb-0">
                            Don't have an account?{" "}
                            <Link to={signupUrl} className="fw-bold">
                              Sign Up
                            </Link>
                          </p>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
      <br />
    </>
  );
}
