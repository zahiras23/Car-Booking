import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBookingByUser } from "./User.slice";
import { getVehicle } from "./Vehicle.slice";


const baseUrl = "http://localhost:4000/api/userApi/";

const bookingInitialState = {
    isBooked: false,
    isDeleted: false
}

//---Book Vehicle for rent
export const vehicleBooking = createAsyncThunk(
    "bookingSlice/vehicleBooking",
    async (bookingData, { rejectWithValue, dispatch }) => {
        try {
            const token = localStorage.getItem("token")
            const { vid, bookedFrom, bookedTo, address, paymentMode, type } = bookingData;
            var config = {
                method: 'POST',
                url: `${baseUrl}bookVehicle`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { vid, bookedFrom, bookedTo, address, paymentMode }
            };
            const response = await axios(config)
            toast.success(response.data.message)
            dispatch(getVehicle(type))
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

//---Cancel booking of vehicle
export const cancelBooking = createAsyncThunk(
    "bookingSlice/cancelBooking",
    async (bookingData, { rejectWithValue, dispatch }) => {
        try {
            // console.log(bookingData)
            const token = localStorage.getItem("token")
            const { vehicleId, bookingId } = bookingData;
            var config = {
                method: 'POST',
                url: `${baseUrl}cancelBooking`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: { vehicleId, bookingId }
            };
            const response = await axios(config)
            toast.success(response.data.message)
            dispatch(getBookingByUser())
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: bookingInitialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(vehicleBooking.pending, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(vehicleBooking.fulfilled, (state, action) => {
                return {
                    ...state,
                    isBooked: true

                }
            })
            .addCase(vehicleBooking.rejected, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(cancelBooking.pending, (state, action) => {
                return {
                    ...state
                }
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                return {
                    ...state,
                    isDeleted: true
                }
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                return {
                    ...state
                }
            })
    }
})

export default bookingSlice.reducer;
