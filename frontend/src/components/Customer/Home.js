import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../slices/Feedback.slice";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const vehicleTypesArray = [
  { photo: "images/car1.png", name: "Car" },
  { photo: "images/bus.png", name: "MiniBus" },
  { photo: "images/bike1.png", name: "Bike" },
  { photo: "images/auto.png", name: "AutoRikshaw" },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  const [feedback, setFeedback] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const feedbcakState = useSelector((state) => state.feedbackState);

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  useEffect(() => {
    if (feedbcakState.allFeedback) {
      setFeedback(feedbcakState.allFeedback);
    }
  }, [feedbcakState]);

  //Vehicle Types
  const vehicleTypes = vehicleTypesArray.map((type) => {
    return (
      <div className="col" key={type.name}>
        <div className="service_box">
          <div className="breakfast_img">
            <img src={type.photo} alt="" />
          </div>
        </div>
        <h4 className="breakfast_text">{type.name}</h4>
        <br />

        <div className="seemore_bt">
          <Link to={token ? `/vehicleType/${type.name}` : "/login"}>
            See More
          </Link>
        </div>
      </div>
    );
  });

  //Display all Feedbacks
  const allFeedback = feedback.map((f) => {
    const stars = [];
    const rate = f.rate;
    for (let i = 0; i < rate; i++) {
      stars.push(
        <i
          className="fa fa-star"
          key={i}
          style={{ fontSize: "20px", color: "#FCC416" }}
        ></i>
      );
    }
    return (
      <div
        className="card "
        style={{
          backgroundColor: "rgba(234, 222, 222, 0.9)",
          marginRight: "3%",
          height: "100%",
          borderColor: "orange",
        }}
        key={f._id}
      >
        <h5 className="card-header">{f.userInfo[0].userName}</h5>
        <div className="card-body">
          {stars}
          <h6 className="card-text" style={{ color: "#2e2c2c" }}>
            {f.comment}
          </h6>
        </div>
      </div>
    );
  });
  return (
    <>
      {/* <Header /> */}
      <div className="container-fluid">
        <div className="layout_main">
          {/* <!-- banner section start --> */}
          <div className="banner_section">
            <div
              id="main_slider"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <img src="/images/bgHome.png" alt="" />
                      </div>
                      <div className="col-md-6">
                        <h4 className="banner_taital">
                          EcoRide Rentals At Low Prices{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- banner section end -->
                    <!-- service section start --> */}
          <div className="service_section layout_padding">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="service_taital">Quick Searches</h1>
                </div>
              </div>
              <div className="service_section_2">
                <div className="row">{vehicleTypes}</div>
              </div>
            </div>
            {/*
                    <!-- testimonial section start --> */}
            <div className="testimonial_section layout_padding">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <h1 className="testimonial_taital">Why us? </h1>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="card "
                    style={{
                      width: "30%",
                      backgroundColor: "rgba(234, 222, 222, 0.9)",
                      marginRight: "3%",
                      borderColor: "orange",
                      padding: 0,
                    }}
                  >
                    <h5 className="card-header">Well maintained vehicles</h5>
                    <div className="card-body">
                      <p className="card-text">
                        Regular services & maintenance. Inspected before each
                        trip.
                      </p>
                    </div>
                  </div>
                  <div
                    className="card "
                    style={{
                      width: "30%",
                      backgroundColor: "rgba(234, 222, 222, 0.9)",
                      marginRight: "3%",
                      borderColor: "orange",
                      padding: 0,
                    }}
                  >
                    <h5 className="card-header">Flexible pricing plans</h5>
                    <div className="card-body">
                      <p className="card-text">
                        Choose `Unlimited kms` with fuel plans.
                      </p>
                    </div>
                  </div>
                  <div
                    className="card "
                    style={{
                      width: "30%",
                      backgroundColor: "rgba(234, 222, 222, 0.9) ",
                      marginRight: "3%",
                      borderColor: "orange",
                      padding: 0,
                    }}
                  >
                    <h5 className="card-header">
                      Free home delivery & returns
                    </h5>
                    <div className="card-body">
                      <p className="card-text">
                        On-time doorstap service, at your preferred location and
                        time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* about service section start */}
              <br />
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <h1 className="testimonial_taital">
                      Sanitized & Safe Vehicles
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="card text-white"
                    style={{ width: "30%", marginRight: "3%", padding: 0 }}
                  >
                    <img
                      src="https://revvselfdrivecar.s3-us-west-2.amazonaws.com/staging_images/banner_sanitised_01-min.jpg"
                      alt=""
                    />
                  </div>
                  <div
                    className="card text-white"
                    style={{ width: "30%", marginRight: "3%", padding: 0 }}
                  >
                    <img
                      src="https://revvselfdrivecar.s3-us-west-2.amazonaws.com/staging_images/banner_sanitised_02-min.jpg"
                      alt=""
                    />
                  </div>
                  <div
                    className="card text-white"
                    style={{ width: "30%", marginRight: "3%", padding: 0 }}
                  >
                    <img
                      src="https://revvselfdrivecar.s3-us-west-2.amazonaws.com/staging_images/banner_sanitised_03-min.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/* about service section end */}

              {/* rate and review section start */}
              <br />
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <h1 className="testimonial_taital">Our Customer Says </h1>
                  </div>
                </div>
                <Carousel responsive={responsive}>{allFeedback}</Carousel>
              </div>
              {/* rate and review section end */}

              {/* Steps of website section start */}
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <h1 className="testimonial_taital">
                      Rent A Vehicle With Us{" "}
                    </h1>
                  </div>
                </div>
                <div>
                  <h5 className="step_text pl-4">
                    All you need to follow these steps:
                  </h5>

                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step 1
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Register yourself with us</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step 2
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Login with your credentials</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step 3
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Select a vehicle of your choice</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step 4
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Tell us when and where to delivery
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel5"}
                    onChange={handleChange("panel5")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step 5
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        It will be delivered to your doorstep
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel6"}
                    onChange={handleChange("panel6")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step 6
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Get on the wheels and enjoy your trip
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>

                {/* <div className="stepper d-flex flex-column mt-5 ml-2">
                  <h5 className="step_text">
                    All you need to follow these steps:
                  </h5>
                  <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                      <div className="rounded-circle py-2 px-3  text-white mb-1 step_css">
                        1
                      </div>
                      <div className="line h-100"></div>
                    </div>
                    <div>
                      <p className="lead pb-3 step_text">
                        Register yourself with us
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                      <div className="rounded-circle py-2 px-3 step_css text-white mb-1">
                        2
                      </div>
                      <div className="line h-100"></div>
                    </div>
                    <div>
                      <p className="lead step_text pb-3">
                        Login with your credentials
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                      <div className="rounded-circle py-2 px-3 step_css text-white mb-1">
                        3
                      </div>
                      <div className="line h-100 d-none"></div>
                    </div>
                    <div>
                      <p className="lead step_text pb-3">
                        Select a vehicle of your choice
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                      <div className="rounded-circle py-2 px-3 step_css text-white mb-1">
                        4
                      </div>
                      <div className="line h-100 d-none"></div>
                    </div>
                    <div>
                      <p className="lead step_text pb-3">
                        Tell us when and where to delivery
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                      <div className="rounded-circle py-2 px-3 step_css text-white mb-1">
                        5
                      </div>
                      <div className="line h-100 d-none"></div>
                    </div>
                    <div>
                      <p className="lead step_text pb-3">
                        It will be delivered to your doorstep
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                      <div className="rounded-circle py-2 px-3 step_css text-white mb-1">
                        6
                      </div>
                      <div className="line h-100 d-none"></div>
                    </div>
                    <div>
                      <p className="lead step_text pb-3">
                        Get on the wheels and enjoy your trip
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Steps of website section end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
