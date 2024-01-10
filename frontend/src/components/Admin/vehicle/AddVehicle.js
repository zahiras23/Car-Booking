import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetColorName } from "hex-color-to-color-name";
import { addVehicle } from "../../../slices/Vehicle.slice";

const theme = createTheme();

export default function AddNewVehicle() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState();
  const [capacity, setCapacity] = useState("");
  const [fuel, setFuel] = useState("");
  const [rent, setRent] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [panelty, setPanelty] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const colorName = GetColorName(color);


    if (name.trim().length <= 0) {
      toast.error("Give vehicle name.");
    } else if (colorName.trim().length <= 0) {
      toast.error("Select vehicle color.");
    } else if (capacity.trim().length <= 0) {
      toast.error("Give vehicle capacity.");
    } else if (fuel.trim().length <= 0) {
      toast.error("Select fuel type.");
    } else if (rent.trim().length <= 0) {
      toast.error("Give charges for rent.");
    } else if (vehicleNo.trim().length <= 0) {
      toast.error("Give vehicle number.");
    } else if (panelty.trim().length <= 0) {
      toast.error("Give penalty for extra day.");
    } else if (!file) {
      toast.error("Please,select photo for vehicle.");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("color", colorName);
      formData.append("capacity", capacity);
      formData.append("fuel", fuel);
      formData.append("rent", rent);
      formData.append("no", vehicleNo);
      formData.append("panelty", panelty);
      formData.append("type", type);
      formData.append("image", file);
      formData.append("fileName", file.name);
      dispatch(addVehicle(formData));
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <marquee>
            <h5>Vehicle Registration</h5>
          </marquee>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="vehicle_name"
                  placeholder="vehicle Name"
                  name="vehicle_name"
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="favcolor">Select Vehicle color:</label>
                <input
                  type="color"
                  onChange={(event) => setColor(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="file"
                    name="file"
                    accept=".png,.jpeg,.webp"
                    onChange={fileHandler}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="capacity"
                  placeholder="Capacity"
                  type="number"
                  id="capacity"
                  onChange={(event) => setCapacity(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <select
                  className="form-select form-secondary"
                  aria-label="Disabled select example"
                  onChange={(event) => setFuel(event.target.value)}
                >
                  <option className="dropdown-item" selected disabled>
                    Select Fuel Type
                  </option>
                  <option className="dropdown-item" value="Electric">
                    Electric
                  </option>
                  <option className="dropdown-item" value="Petrol">
                    Petrol
                  </option>
                  <option className="dropdown-item" value="Diesel">
                    Diesel
                  </option>
                  <option className="dropdown-item" value="CNG">
                    CNG
                  </option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rentkm"
                  placeholder="Rent Per Km"
                  type="number"
                  id="rentkm"
                  onChange={(event) => setRent(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="vehicleNo"
                  placeholder="Vehicle No"
                  id="vehicleNo"
                  onChange={(event) => setVehicleNo(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="penalty"
                  placeholder="Penalty Per Day"
                  id="penalty"
                  type="number"
                  onChange={(event) => setPanelty(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <select
                  className="form-select form-secondary"
                  aria-label="Disabled select example"
                  onChange={(event) => setType(event.target.value)}
                >
                  <option className="dropdown-item" selected disabled>
                    Select Vehicle Type
                  </option>
                  <option className="dropdown-item" value="Car">
                    Car
                  </option>
                  <option className="dropdown-item" value="MiniBus">
                    MiniBus
                  </option>
                  <option className="dropdown-item" value="Bike">
                    Bike
                  </option>
                  <option className="dropdown-item" value="AutoRikshaw">
                    AutoRikshaw
                  </option>
                </select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, marginLeft: "40%" }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
