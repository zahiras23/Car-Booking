import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const setBaseUrl = (role) => {

    const url = "http://localhost:4000/"
    const baseUrl = role === 'driver' ? `${url}api/driverApi/` : `${url}api/userApi/`
    return baseUrl
}

const profileInitialState = {
    profileData: [],
    profileUpdateStatus: ""
}

//profile information
export const getProfile = createAsyncThunk(
    "profileSlice/getProfile",
    async (Data = {}, { rejectWithValue }) => {
        const role = localStorage.getItem("role")
        const baseUrl = setBaseUrl(role)
        const token = localStorage.getItem("token")
        try {
            var config = {
                method: "post",
                url: `${baseUrl}getProfileInfo`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data);
        }
    }
);

//update profile information
export const updateProfile = createAsyncThunk(
    "profileSlice/updateProfile",
    async (Data, { rejectWithValue }) => {
        const role = localStorage.getItem("role")
        const baseUrl = setBaseUrl(role)
        const token = localStorage.getItem("token")
        const { userName, email, contact, address } = Data
        try {
            var config = {
                method: "patch",
                url: `${baseUrl}updateProfile`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { userName, email, contact, address }
            };
            const response = await axios(config);
            toast.success(response.data.message)
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: "profileSlice",
    initialState: profileInitialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state, action) => {
                return {
                    ...state,
                    profileData: []
                };
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                return {
                    ...state,
                    profileData: action.payload.record,
                    profileUpdateStatus: ""
                };
            })
            .addCase(getProfile.rejected, (state, action) => {
                return {
                    ...state,
                    profileData: []
                };
            })
            .addCase(updateProfile.pending, (state, action) => {
                return {
                    ...state,
                    profileUpdateStatus: "pending"
                };
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                return {
                    ...state,
                    profileUpdateStatus: "success"
                };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                return {
                    ...state,
                    profileUpdateStatus: "rejected"
                };
            })
    }
})
export default profileSlice.reducer;