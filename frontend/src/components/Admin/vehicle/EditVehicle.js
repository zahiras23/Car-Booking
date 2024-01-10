import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetColorName } from "hex-color-to-color-name";
import { useParams } from "react-router-dom";
import { editVehicle, getOneVehicle } from "../../../slices/Vehicle.slice";


const theme = createTheme();

export default function EditVehicle() {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [file, setFile] = useState()
    const [capacity, setCapacity] = useState("");
    const [fuel, setFuel] = useState("");
    const [rent, setRent] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [panelty, setPanelty] = useState("");
    const [type, setType] = useState("");

    const { vid } = useParams()
    const dispatch = useDispatch()
    const vehicleState = useSelector((state) => state.vehicleState)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOneVehicle(vid))
    }, [dispatch, vid])

    useEffect(() => {
        if (vehicleState.oneVehicleStatus === "success") {
            setName(vehicleState.oneVehicleRecord.vehicleName)
            setCapacity(vehicleState.oneVehicleRecord.capacity)
            setFuel(vehicleState.oneVehicleRecord.fuelType)
            setRent(vehicleState.oneVehicleRecord.rentPerKm)
            setVehicleNo(vehicleState.oneVehicleRecord.vehicleNo)
            setPanelty(vehicleState.oneVehicleRecord.penaltyPerDay)
            setType(vehicleState.oneVehicleRecord.vehicleType)
        }
    }, [vehicleState.oneVehicleStatus])

    const fileHandler = (event) => {
        setFile(event.target.files[0])
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const colorName = GetColorName(color);

        if (colorName.trim().length === 0) {
            toast.error("please,select vehicle color.")
        }
        else if (!file) {
            toast.error("Please,select photo for vehicle.")
        }

        if (file && colorName.trim().length > 0) {
            const formData = new FormData();
            formData.append("vid", vid);
            formData.append("name", name);
            formData.append("color", colorName);
            formData.append("capacity", capacity);
            formData.append("fuel", fuel);
            formData.append("rent", rent);
            formData.append("no", vehicleNo);
            formData.append("panelty", panelty);
            formData.append("type", type);
            formData.append("image", file);
            formData.append('fileName', file.name)
            dispatch(editVehicle(formData)).then(() => {
                navigate("/adminHome/getVehicleByTypes")
            })
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
                    <Typography component="h1" variant="h5">
                        Edit Vehicle Here...
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="vehicle_name"
                                    placeholder="vehicle Name"
                                    name="vehicle_name"
                                    value={name}
                                    label="Vehicle Name"
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
                                Vehicle Photo:
                                <img src={vehicleState.oneVehicleRecord.photo} height={100} width={170} />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="file"
                                        name="file"
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
                                    label="Vehicle Capacity"
                                    value={capacity}
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
                                    <option className="dropdown-item" value="Desel">
                                        Desel
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
                                    label="Rent Per Km"
                                    value={rent}
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
                                    label="Vehicle No"
                                    value={vehicleNo}
                                    onChange={(event) => setVehicleNo(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="penalty"
                                    placeholder="Panelty Per Day"
                                    id="penalty"
                                    type="number"
                                    label="Panelty Per Day"
                                    value={panelty}
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
                            sx={{ mt: 3, mb: 2, marginLeft: "30%" }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider >
    );
}