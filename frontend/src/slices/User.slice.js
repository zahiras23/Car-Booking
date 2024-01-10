import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:4000/api/userApi/";

const initialUserState = {
    registerStatus: "",
    registerError: "",
    token: "",
    userName: "",
    loginStatus: "",
    loginError: "",
    verifyStatus: "",
    verifyError: "",
    isLogout: "",
    logoutError: "",
    getBookingData: [],
    getBookingDataStatus: "",
    resetPasswordStatus: "",
}

//---register thunk
export const registerUser = createAsyncThunk("userSlice/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const { uname, email, password, cpassword, dob, phone, gender, address, pincode } = userData;
        const response = await axios.post(baseUrl + "registerUser", {
            uname, email, password, cpassword, dob, phone, gender, address, pincode
        });
        return response.data;
    } catch (error) {
        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
});

//---login thunk
export const loginUser = createAsyncThunk("userSlice/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const { email, password } = userData;
        const response = await axios.post(baseUrl + "loginUser", {
            email, password
        });
        localStorage.setItem("email", email);
        return response.data;
    } catch (error) {
        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
});

//---Email Verification
export const emailVerify = createAsyncThunk("userSlice/emailVerify", async (otp, { rejectWithValue }) => {
    try {
        const email = localStorage.getItem("email")
        const response = await axios.post(baseUrl + "userValidate/otpVerify", {
            email, otp
        });
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userName", response.data.userName)
        return response.data;
    } catch (error) {
        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
});

//---Logout user
export const logoutUser = createAsyncThunk("userSlice/logoutUser", async (userData = null, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")

        var config = {
            method: 'post',
            url: `${baseUrl}logoutUser`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios(config);
        // console.log("res---" + await response.data)
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        return response.data;
    } catch (error) {

        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
});

//---Get booking data of user
export const getBookingByUser = createAsyncThunk("userSlice/getBookingByUser", async (userData = {}, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")

        var config = {
            method: 'post',
            url: `${baseUrl}getBookingByUser`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios(config);

        return response.data;
    } catch (error) {
        const e = error.response.data.message;
        toast.error(e)
        return rejectWithValue(error.response.data)
    }
})

//Change Current password
export const resetPassword = createAsyncThunk(
    "userSlice/resetPassword",
    async (adminData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");

            const { currentPassword, newPassword } = adminData
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

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialUserState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            return {
                ...state,
                registerStatus: "pending",
                registerError: ""
            }
        },
        [registerUser.fulfilled]: (state, action) => {
            return {
                ...state,
                registerStatus: "success",
                registerError: ""
            }
        },
        [registerUser.rejected]: (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }
        },
        [loginUser.pending]: (state, action) => {
            return {
                ...state,
                loginStatus: "pending",
                loginError: ""
            }
        },
        [loginUser.fulfilled]: (state, action) => {
            return {
                ...state,
                // token: action.payload,
                loginStatus: "success",
                verifyStatus: "",
                loginError: ""
            }
        },
        [loginUser.rejected]: (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            }
        },
        [emailVerify.pending]: (state, action) => {
            return {
                ...state,
                verifyStatus: "pending",
                verifyError: ""
            }
        },
        [emailVerify.fulfilled]: (state, action) => {
            return {
                ...state,
                token: action.payload,
                userName: action.payload.userName,
                verifyStatus: "success",
                verifyError: ""
            }
        },
        [emailVerify.rejected]: (state, action) => {
            return {
                ...state,
                verifyStatus: "rejected",
                verifyError: action.payload
            }
        },
        [logoutUser.pending]: (state, action) => {
            return {
                ...state,
                isLogout: "pending",
                loginStatus: "",
                logoutError: ""
            }
        },
        [logoutUser.fulfilled]: (state, action) => {
            return {
                ...state,
                isLogout: "success",
                verifyStatus: "",
                loginStatus: "",
                logoutError: ""
            }
        },
        [logoutUser.rejected]: (state, action) => {
            return {
                ...state,
                isLogout: "rejected",
                loginStatus: "",
                logoutError: action.payload
            }
        },
        [getBookingByUser.pending]: (state, action) => {
            return {
                ...state,
                getBookingDataStatus: "pending"
            }
        },
        [getBookingByUser.fulfilled]: (state, action) => {
            return {
                ...state,
                getBookingData: action.payload.userBookingData,
                getBookingDataStatus: "success"
            }
        },
        [getBookingByUser.rejected]: (state, action) => {
            return {
                ...state,
                getBookingDataStatus: "rejected"
            }
        },
        [resetPassword.pending]: (state, action) => {
            return {
                ...state,
                resetPasswordStatus: "pending"
            }
        },
        [resetPassword.fulfilled]: (state, action) => {
            return {
                ...state,
                getBookingData: action.payload.userBookingData,
                resetPasswordStatus: "success"
            }
        },
        [resetPassword.rejected]: (state, action) => {
            return {
                ...state,
                resetPasswordStatus: "rejected"
            }
        },
    }
});

export default userSlice.reducer;
