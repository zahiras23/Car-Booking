import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Radio, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../slices/User.slice";


// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="localhost:/3000">
//         Rent A Vehicle
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("female");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (userState.registerStatus === "success") {
      navigate("/login");
    }
  }, [navigate, userState]);

  const handleSubmit = (event) => {
    console.log("hello");
    event.preventDefault();
    const phoneExpression = /^(0|91)?[6-9][0-9]{9}$/;
    const pincodeExpression = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
    const emailExpression = /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    //Date of Birth validation
    const currdate = new Date();
    const curYear = currdate.getFullYear();
    let curMonth = currdate.getMonth() + 1;
    curMonth = curMonth < 10 ? "0" + curMonth : "" + curMonth;
    let curDay = currdate.getDate();
    curDay = curDay < 10 ? "0" + curDay : "" + curDay;
    const todayDate = `${curYear}-${curMonth}-${curDay}`;

    if (email.trim().length === 0 || !emailExpression.test(email)) {
      toast.error("Please Enter Valid Email.");
    } else if (password.trim().length < 6) {
      toast.error("Password Must Have Atleast 6 Letters.");
    } else if (password !== cpassword) {
      toast.error("Password And Confirm Password Must Be Same.");
    } else if (dob > todayDate) {
      toast.error("Birth Date Must Be Less Than Today.");
    } else if (phone.length < 10 || !phoneExpression.test(phone)) {
      toast.error("Please Enter Valid Contact Number.");
    } else if (pincode.length < 6 || !pincodeExpression.test(pincode)) {
      toast.error("Please Enter Valid Pincode");
    } else {
      const userData = {
        uname,
        email,
        password,
        cpassword,
        dob,
        phone,
        gender,
        address,
        pincode,
      };
      dispatch(registerUser(userData));
    }
  };

  return (
    <body
      style={{
        backgroundColor: "rgba(234, 222, 222, 0.9)",
        marginLeft: "-0.5%",
        paddingBottom: "6%",
      }}
    >
      <ThemeProvider theme={theme}>
        <div style={{ }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "25px",
                width: "120%",
                paddingBottom: "20px"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      id="userName"
                      placeholder="UserName"
                      name="userName"
                      InputProps={{
                        style: { height: "30px", borderColor: "white" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setUname(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      id="email"
                      placeholder="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email"
                      InputProps={{
                        style: { height: "30px" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      InputProps={{
                        style: { height: "30px" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      name="password"
                      placeholder="Confirm Password"
                      type="password"
                      id="cpassword"
                      InputProps={{
                        style: { height: "30px" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setCpassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      id="dob"
                      type="date"
                      name="dob"
                      InputProps={{
                        style: { color: "#72747E ", height: "30px" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setDob(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      name="phone"
                      placeholder="Phone"
                      type="tel"
                      id="phone"
                      InputProps={{
                        style: { height: "30px" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(event) => setGender(event.target.value)}
                      style={{ color: "#72747E ", marginLeft: "15%" }}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      name="address"
                      placeholder="Address"
                      id="address"
                      multiline
                      InputProps={{
                        style: { height: "30px" },
                      }}
                      className="w-75 p-2"
                      maxRows={4}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <TextField
                      required
                      fullWidth
                      id="filled-number"
                      placeholder="Pincode"
                      name="pincode"
                      type="tel"
                      InputProps={{
                        style: { height: "30px" },
                      }}
                      className="w-75 p-2"
                      onChange={(event) => setPincode(event.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginLeft: "40%" }}
                  // onClick={registerHandler}
                >
                  Sign Up
                </Button>
                <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                  <Grid item  >
                    Already have an account?
                    <Link href="/login" variant="body2" fontSize="15px">
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </body>
  );
}
