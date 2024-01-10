import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:4000/api/userApi/"

const initialFeedbackState = {
    feedbackStatus: "",
    allFeedback: []
}

//---Feedback Thunk
export const giveFeedback = createAsyncThunk(
    "feedbackSlice/giveFeedback",
    async (feedbackData, { rejectWithValue }) => {
        try {
            const { rate, comment } = feedbackData
            const token = localStorage.getItem("token")

            let config = {
                method: "post",
                url: `${baseUrl}giveFeedback`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { rate, comment }
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

//---Get all feedback Thunk
export const getFeedback = createAsyncThunk(
    "feedbackSlice/getFeedback",
    async (feedbackData = {}, { rejectWithValue }) => {
        try {

            let config = {
                method: "get",
                url: `${baseUrl}getFeedback`
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

const feedbackSlice = createSlice({
    name: "feedbackSlice",
    initialState: initialFeedbackState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(giveFeedback.pending, (state, action) => {
                return {
                    ...state,
                    feedbackStatus: "pending",
                };
            })
            .addCase(giveFeedback.fulfilled, (state, action) => {
                return {
                    ...state,
                    feedbackStatus: "success",
                };
            })
            .addCase(giveFeedback.rejected, (state, action) => {
                return {
                    ...state,
                    feedbackStatus: "rejected"
                };
            })
            .addCase(getFeedback.pending, (state, action) => {
                return {
                    ...state,
                };
            })
            .addCase(getFeedback.fulfilled, (state, action) => {
                return {
                    ...state,
                    allFeedback: action.payload.feedbacks
                };
            })
            .addCase(getFeedback.rejected, (state, action) => {
                return {
                    ...state
                };
            })
    }
})

export default feedbackSlice.reducer;