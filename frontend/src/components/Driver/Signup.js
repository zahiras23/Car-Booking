import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerDriver } from "../../slices/Driver.slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const driverState = useSelector((state) => state.driverState);

  useEffect(() => {
    if (driverState.registerStatus === "success") {
      navigate("/driver/login");
    }
  }, [driverState, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    
    const emailExpression = /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    const phoneExpression = /^(0|91)?[6-9][0-9]{9}$/;
    const pincodeExpression = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;

    //Date of Birth validation
    const currdate = new Date();
    const curYear = currdate.getFullYear();
    let curMonth = currdate.getMonth() + 1;
    curMonth = curMonth < 10 ? "0" + curMonth : "" + curMonth;
    let curDay = currdate.getDate();
    curDay = curDay < 10 ? "0" + curDay : "" + curDay;
    const finalCurDate = `${curYear}-${curMonth}-${curDay}`;

    if (name.trim().length === 0) {
      toast.error("Please Enter User Name");
    } else if (email.trim().length === 0 || !emailExpression.test(email)) {
      toast.error("Please Enter Valid Email Address");
    } else if (password.trim().length < 6) {
      toast.error("Password Must Have Atleast 6 Letters.");
    } else if (cpassword.trim().length === 0) {
      toast.error("Please Enter Confirm Password");
    } else if (password !== cpassword) {
      toast.error("Password And Confirm Password Must Be Same....");
    } else if (contact.length < 10 || !phoneExpression.test(contact)) {
      toast.error("Please Enter valid contact number.");
    } else if (dob > finalCurDate) {
      toast.error("Birth Date Must Be Less Than Today");
    } else if (pincode.length < 6 || !pincodeExpression.test(pincode)) {
      toast.error("Please Enter Valid Pincode");
    } else {
      const driverData = {
        name,
        email,
        password,
        cpassword,
        dob,
        contact,
        gender,
        address,
        pincode,
      };
      dispatch(registerDriver(driverData));
    }
  };
  return (
    <>
      <section
        className="h-100"
        style={{ backgroundColor: "rgba(234, 222, 222, 0.9)" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card card-registration my-4"
                style={{ backgroundColor: "white", borderRadius: "1rem" }}
              >
                <div className="row g-0">
                  <div className="col-xl-6" style={{display: 'flex', alignItems: 'center'}}>
                    <img
                      src="/images/driverSignup.jpeg"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 ">
                      <h5 className="mb-5 text-uppercase">
                        Driver registration form
                      </h5>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example1m">
                          User name
                        </label>
                        <input
                          type="text"
                          id="form3Example1m"
                          className="form-control "
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example97">
                          Email ID
                        </label>
                        <input
                          type="email"
                          id="form3Example97"
                          className="form-control "
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" for="form3Example1m">
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example1m"
                              className="form-control "
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" for="form3Example1n">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="form3Example1n"
                              className="form-control "
                              onChange={(event) =>
                                setCpassword(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" for="form3Example97">
                              Date Of Birth
                            </label>
                            <input
                              type="date"
                              id="form3Example97"
                              className="form-control "
                              onChange={(event) => setDob(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" for="form3Example97">
                              Phone
                            </label>
                            <input
                              type="number"
                              id="form3Example97"
                              className="form-control "
                              onChange={(event) =>
                                setContact(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-md-flex mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender </h6>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genderRadio"
                            id="femaleGender"
                            value="Female"
                            onChange={(event) => setGender(event.target.value)}
                          />
                          <label
                            className="form-check-label"
                            for="femaleGender"
                          >
                            Female
                          </label>
                        </div>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genderRadio"
                            id="maleGender"
                            value="Male"
                            onChange={(event) => setGender(event.target.value)}
                          />
                          <label className="form-check-label" for="maleGender">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genderRadio"
                            id="otherGender"
                            value="Other"
                            onChange={(event) => setGender(event.target.value)}
                          />
                          <label className="form-check-label" for="otherGender">
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example8">
                          Address
                        </label>
                        <textarea
                          class="form-control"
                          id="floatingTextarea"
                          onChange={(event) => setAddress(event.target.value)}
                          style={{ height: "100px" }}
                        ></textarea>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example90">
                          Pincode
                        </label>
                        <input
                          type="text"
                          id="form3Example90"
                          className="form-control "
                          onChange={(event) => setPincode(event.target.value)}
                        />
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          onClick={submitHandler}
                        >
                          Register
                        </button>
                      </div>
                      <br />
                      <p className="mb-0" style={{ marginLeft: "25%" }}>
                        Already Have an Account{" "}
                        <Link to="/driver/login" className="fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
