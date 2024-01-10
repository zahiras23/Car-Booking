import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CustomerbaseUrl = "http://localhost:4000/api/userApi/";
const DriverbaseUrl = "http://localhost:4000/api/driverApi/";
const AdminbaseUrl = "http://localhost:4000/api/adminApi/";

const initialPasswordState = {
    otpStatus: "",
    otpError: "",
    passwordStatus: "",
    passwordError: "",
    verifyStatus: "",
    verifyError: "",
}

//---sendOTP thunk
export const sendOTP = createAsyncThunk("forgotPassword/sendOTP", async (email, { rejectWithValue }) => {
    try {
        const path = window.location.pathname;
        localStorage.setItem("email", email)
        let response
        if (path === '/forgotPassword') {
            response = await axios.post(CustomerbaseUrl + "forgotPassword/otpGeneration", {
                email
            });
        }
        else if (path === '/admin/forgotPassword') {
            response = await axios.post(AdminbaseUrl + "forgotPassword/otpGeneration", {
                email
            });
        }
        else if (path === '/driver/forgotPassword') {
            response = await axios.post(DriverbaseUrl + "forgotPassword/otpGeneration", {
                email
            });
        }
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data)
    }
});

export const forgotEmailVerify = createAsyncThunk("forgotPassword/forgotEmailVerify", async (otp, { rejectWithValue }) => {
    try {
        const path = window.location.pathname;
        const email = localStorage.getItem("email")
        let response
        if (path === '/forgotPassword/otpVarifier') {
            response = await axios.post(CustomerbaseUrl + "forgotPassword/otpVerify", {
                email, otp
            });
        }
        else if (path === '/admin/forgotPassword/otpVarifier') {
            response = await axios.post(AdminbaseUrl + "forgotPassword/otpVerify", {
                email, otp
            });
        }
        else if (path === '/driver/forgotPassword/otpVarifier') {
            response = await axios.post(DriverbaseUrl + "forgotPassword/otpVerify", {
                email, otp
            });
        }
        return response.data;
    } catch (error) {
        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
});

//---Change Password Thunk
export const newPassword = createAsyncThunk("forgotPassword/newPassword", async (password, { rejectWithValue }) => {
    try {
        const email = localStorage.getItem("email");
        const path = window.location.pathname
        let response;
        if (path === '/changeNewPassword') {
            response = await axios.patch(CustomerbaseUrl + "forgotPassword", {
                email, password
            });
        }
        else if (path === '/admin/changeNewPassword') {
            response = await axios.patch(AdminbaseUrl + "forgotPassword", {
                email, password
            });
        }
        else if (path === '/driver/changeNewPassword') {
            response = await axios.patch(DriverbaseUrl + "forgotPassword", {
                email, password
            });
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

const passwordSlice = createSlice({
    name: "forgotPassword",
    initialState: initialPasswordState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(sendOTP.pending, (state, action) => {
                return {
                    ...state,
                    otpStatus: "pending",
                    otpError: ""
                }
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                return {
                    ...state,
                    otpStatus: "success",
                    otpError: ""
                }
            })
            .addCase(sendOTP.rejected, (state, action) => {
                return {
                    ...state,
                    otpStatus: "rejected",
                    otpError: action.payload
                }
            })
            .addCase(forgotEmailVerify.pending, (state, action) => {
                return {
                    ...state,
                    verifyStatus: "pending",
                    passwordError: ""
                }
            })
            .addCase(forgotEmailVerify.fulfilled, (state, action) => {
                return {
                    ...state,
                    verifyStatus: "success",
                    passwordError: ""
                }
            })
            .addCase(forgotEmailVerify.rejected, (state, action) => {
                return {
                    ...state,
                    verifyStatus: "rejected",
                    passwordError: action.payload
                }
            })
            .addCase(newPassword.pending, (state, action) => {
                return {
                    ...state,
                    passwordStatus: "pending",
                    passwordError: ""
                }
            })
            .addCase(newPassword.fulfilled, (state, action) => {
                return {
                    ...state,
                    passwordStatus: "success",
                    passwordError: ""
                }
            })
            .addCase(newPassword.rejected, (state, action) => {
                return {
                    ...state,
                    passwordStatus: "rejected",
                    passwordError: action.payload
                }
            })
    }
})

export default passwordSlice.reducer;