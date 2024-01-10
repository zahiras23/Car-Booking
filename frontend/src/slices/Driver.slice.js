import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:4000/api/driverApi/"

const initialDriverState = {
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    verifyStatus: "",
    verifyError: "",
    token: "",
    userName: "",
    isLogout: "",
    logoutError: "",
    allocateBookingStatus: "",
    allAllocatedBooking: [],
    changeCurrentPasswordStatus: "",
    profileData: [],
    profileUpdateStatus: ""
}

//---register thunk
export const registerDriver = createAsyncThunk("driverSlice/registerDriver", async (userData, { rejectWithValue }) => {
    try {
        const { name, email, password, cpassword, dob, contact, gender, address, pincode } = userData;
        const response = await axios.post(baseUrl + "registerDriver", {
            name, email, password, cpassword, dob, contact, gender, address, pincode
        });
        toast.success("Driver Created")
        return response.data;
    } catch (error) {
        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
});

//---login thunk
export const loginDriver = createAsyncThunk(
    "driverSlice/loginDriver",
    async (userData, { rejectWithValue }) => {
        try {
            const { email, password } = userData;
            const response = await axios.post(baseUrl + "loginDriver", {
                email,
                password,
            });
            localStorage.setItem("email", email);

            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data);
        }
    }
);

//---Email Verification
export const driverVerify = createAsyncThunk(
    "driverSlice/driverVerify",
    async (otp, { rejectWithValue }) => {
        try {
            const email = localStorage.getItem("email");
            const response = await axios.post(baseUrl + "driverValidate/otpVerify", {
                email,
                otp,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.userName);
            return response.data;
        } catch (error) {
            const e = error.response.data.message;
            toast.error(e);
            return rejectWithValue(error.response.data);
        }
    }
);


//logout
export const logoutDriver = createAsyncThunk(
    "driverSlice/logoutDriver",
    async (userData = null, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            console.log(token)
            var config = {
                method: "post",
                url: `${baseUrl}logoutDriver`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios(config);

            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("userName");
            localStorage.removeItem("role");

            return response.data;

        } catch (error) {
            // console.log("err--" + error)
            const e = error.response.data.message;
            toast.error(e);
            return rejectWithValue(error.response.data);
        }
    }
);

//Get all allocated booking of loggedIn Driver
export const allocatedBookings = createAsyncThunk(
    "driverSlice/allocatedBookings",
    async (userData = null, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            var config = {
                method: "post",
                url: `${baseUrl}getDriverAssignedBooking`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(config);
            return response.data;

        } catch (error) {
            // console.log("err--" + error)
            const e = error.response.data.message;
            toast.error(e);
            return rejectWithValue(error.response.data);
        }
    }
);

//Change Current password
export const resetDriverPassword = createAsyncThunk(
    "driverSlice/resetDriverPassword",
    async (driverData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");

            const { currentPassword, newPassword } = driverData
            let config = {
                method: "patch",
                url: `${baseUrl}changePassword`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { currentPassword, newPassword, email }
            };
            const response = await axios(config);
            toast.success(response.data.message)
            return response.data;
        } catch (error) {
            const e = error.response.data.message;
            toast.error(e)
            return rejectWithValue(error.response.data);
        }
    }
);

const driverSlice = createSlice({
    name: "driverSlice",
    initialState: initialDriverState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(registerDriver.pending, (state, action) => {
                return {
                    ...state,
                    registerStatus: "pending",
                    registerError: "",
                };
            })
            .addCase(registerDriver.fulfilled, (state, action) => {
                return {
                    ...state,
                    token: action.payload.token,
                    registerStatus: "success",
                    registerError: "",
                };
            })
            .addCase(registerDriver.rejected, (state, action) => {
                return {
                    ...state,
                    registerStatus: "rejected",
                    registerError: action.payload,
                };
            })
            .addCase(loginDriver.pending, (state, action) => {
                return {
                    ...state,
                    loginStatus: "pending",
                    loginError: "",
                };
            })
            .addCase(loginDriver.fulfilled, (state, action) => {
                return {
                    ...state,
                    loginStatus: "success",
                    verifyStatus: "",
                    loginError: "",
                };
            })
            .addCase(loginDriver.rejected, (state, action) => {
                return {
                    ...state,
                    loginStatus: "rejected",
                    loginError: action.payload,
                };
            })
            .addCase(driverVerify.pending, (state, action) => {
                return {
                    ...state,
                    verifyStatus: "pending",
                    verifyError: "",
                };
            })
            .addCase(driverVerify.fulfilled, (state, action) => {
                return {
                    ...state,
                    token: action.payload.token,
                    userName: action.payload.userName,
                    verifyStatus: "success",
                    verifyError: "",
                };
            })
            .addCase(driverVerify.rejected, (state, action) => {
                return {
                    ...state,
                    verifyStatus: "rejected",
                    verifyError: action.payload,
                };
            })
            .addCase(logoutDriver.pending, (state, action) => {
                return {
                    ...state,
                    isLogout: "pending",
                    logoutError: "",
                };
            })
            .addCase(logoutDriver.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLogout: "success",
                    verifyStatus: "",
                    loginStatus: "",
                    logoutError: "",
                };
            })
            .addCase(logoutDriver.rejected, (state, action) => {
                return {
                    ...state,
                    isLogout: "rejected",
                    logoutError: action.payload,
                };
            })
            .addCase(allocatedBookings.pending, (state, action) => {
                return {
                    ...state,
                    allocateBookingStatus: "pending",
                    logoutError: "",
                };
            })
            .addCase(allocatedBookings.fulfilled, (state, action) => {
                return {
                    ...state,
                    allAllocatedBooking: action.payload.records,
                    allocateBookingStatus: "success",
                    profileUpdateStatus: "",
                    logoutError: "",
                };
            })
            .addCase(allocatedBookings.rejected, (state, action) => {
                return {
                    ...state,
                    allocateBookingStatus: "rejected",
                    logoutError: action.payload,
                };
            })
            .addCase(resetDriverPassword.pending, (state, action) => {
                return {
                    ...state,
                    changeCurrentPasswordStatus: "pending"

                };
            })
            .addCase(resetDriverPassword.fulfilled, (state, action) => {
                return {
                    ...state,
                    changeCurrentPasswordStatus: "success"

                };
            })
            .addCase(resetDriverPassword.rejected, (state, action) => {
                return {
                    ...state,
                    changeCurrentPasswordStatus: "rejected"
                };
            })

    }
})

export default driverSlice.reducer;