import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:4000/api/adminApi/";

const adminInitialState = {
  allUsers: [],
  fetchUserStatus: "",
  userStatus: "",
  allDrivers: [],
  fetchDriverStatus: "",
  updateDriverStatus: "",
  updateDriverVerifyStatus: "",
  getBookingPendingStatus: "",
  pendingBooking: [],
  getDriverNameStatus: "",
  getDriverName: [],
  bookingAllocateStatus: "",
  getVerifiedDriver: [],
  getVerifiedDriverStatus: "",
  allocatedVehicle: [],
  getAllocatedStatus: "",
  updateVehicleBookingStatus: "",
  customerCount: 0,
  driverCount: 0,
  vehicleCount: 0,
  verifiedDriverCount: 0,
  pendingBookingCount: 0
};
//---Fetch All Users thunk---
export const fetchAllUsers = createAsyncThunk(
  "adminWorkSlice/fetchAllUsers",
  async (userData = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: `${baseUrl}fetchAllUsers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Update User Status Thunk---
export const updateUserStatus = createAsyncThunk(
  "adminWorkSlice/updateUserStatus",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${baseUrl}updateUserStatus/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios(config);
      toast.success(response.data.message)
      dispatch(fetchAllUsers())
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Fetch All Users thunk---
export const fetchAllDrivers = createAsyncThunk(
  "adminWorkSlice/fetchAllDrivers",
  async (driverData = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: `${baseUrl}fetchAllDrivers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Update User Status Thunk---
export const updateDriverStatus = createAsyncThunk(
  "adminWorkSlice/updateDriverStatus",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${baseUrl}updateDriverStatus/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios(config);
      dispatch(fetchAllDrivers())
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Get all booking data with user Thunk---
export const getBookingPendingData = createAsyncThunk(
  "adminWorkSlice/getBookingData",
  async (userData = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${baseUrl}getAllBookingData`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Get all verified drivers Thunk---
export const getVerifiedDrivers = createAsyncThunk(
  "adminWorkSlice/getVerifiedDrivers",
  async (userData = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${baseUrl}getVerifiedDrivers`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Booking allocation to driver Thunk---
export const bookingAllocation = createAsyncThunk(
  "adminWorkSlice/bookingAllocation",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const { id, enteredDriver } = userData
      console.log("bid==" + enteredDriver)
      let config = {
        method: "patch",
        url: `${baseUrl}allocateDriverToTrip/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { enteredDriver }
      };

      const response = await axios(config);
      toast.success(response.data.message)
      dispatch(getBookingPendingData())
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Update Driver verify status Thunk---
export const updateDriverVerify = createAsyncThunk(
  "adminWorkSlice/updateDriverVerify",
  async (driverId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${baseUrl}updateDriverVerify/${driverId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios(config);
      dispatch(fetchAllDrivers())
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Get allocated vehicle
export const getAllocatedVehicle = createAsyncThunk(
  "adminWorkSlice/getAllocatedVehicle",
  async (data = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${baseUrl}getVehicleAllocated`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Get allocated vehicle
export const makeVehicleAvailable = createAsyncThunk(
  "adminWorkSlice/makeVehicleAvailable",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const { bid, vid, returndatetime, bookingStatus } = info
      let config = {
        method: "patch",
        url: `${baseUrl}makeVehicleAvailable`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { bid, vid, returndatetime, bookingStatus }
      };
      const response = await axios(config);
      toast.success(response.data.message)
      dispatch(getAllocatedVehicle())
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Get allocated vehicle
export const countingReport = createAsyncThunk(
  "adminWorkSlice/countingReport",
  async (info = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      let config = {
        method: "get",
        url: `${baseUrl}counting`,
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

const adminWorkSlice = createSlice({
  name: "adminWorkSlice",
  initialState: adminInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        return {
          ...state,
          fetchUserStatus: "pending",
        };
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        return {
          ...state,
          allUsers: action.payload.allUsers,
          fetchUserStatus: "success",
        };
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        return {
          ...state,
          fetchUserStatus: "rejected",
        };
      })
      .addCase(updateUserStatus.pending, (state, action) => {
        return {
          ...state,
          userStatus: "pending",
        };
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        return {
          ...state,
          userStatus: "success",
        };
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        return {
          ...state,
          userStatus: "rejected",
        };
      })
      .addCase(fetchAllDrivers.pending, (state, action) => {
        return {
          ...state,
          fetchDriverStatus: "pending",
        };
      })
      .addCase(fetchAllDrivers.fulfilled, (state, action) => {
        return {
          ...state,
          allDrivers: action.payload.allDrivers,
          fetchDriverStatus: "success",
        };
      })
      .addCase(fetchAllDrivers.rejected, (state, action) => {
        return {
          ...state,
          fetchDriverStatus: "rejected",
        };
      })
      .addCase(updateDriverStatus.pending, (state, action) => {
        return {
          ...state,
          updateDriverStatus: "pending",
        };
      })
      .addCase(updateDriverStatus.fulfilled, (state, action) => {
        return {
          ...state,
          updateDriverStatus: "success",
        };
      })
      .addCase(updateDriverStatus.rejected, (state, action) => {
        return {
          ...state,
          updateDriverStatus: "rejected",
        };
      })
      .addCase(getBookingPendingData.pending, (state, action) => {
        return {
          ...state,
          getBookingPendingStatus: "pending",
        };
      })
      .addCase(getBookingPendingData.fulfilled, (state, action) => {
        return {
          ...state,
          pendingBooking: action.payload.bookingData,
          getBookingPendingStatus: "success",
        };
      })
      .addCase(getBookingPendingData.rejected, (state, action) => {
        return {
          ...state,
          getBookingPendingStatus: "rejected",
        };
      })
      .addCase(bookingAllocation.pending, (state, action) => {
        return {
          ...state,
          bookingAllocateStatus: "pending",
        };
      })
      .addCase(bookingAllocation.fulfilled, (state, action) => {
        return {
          ...state,
          pendingBooking: action.payload.bookingData,
          bookingAllocateStatus: "success",
        };
      })
      .addCase(bookingAllocation.rejected, (state, action) => {
        return {
          ...state,
          bookingAllocateStatus: "rejected",
        };
      })
      .addCase(getVerifiedDrivers.pending, (state, action) => {
        return {
          ...state,
          getVerifiedDriverStatus: "pending",
        };
      })
      .addCase(getVerifiedDrivers.fulfilled, (state, action) => {
        return {
          ...state,
          getVerifiedDriver: action.payload.records,
          getVerifiedDriverStatus: "success",
        };
      })
      .addCase(getVerifiedDrivers.rejected, (state, action) => {
        return {
          ...state,
          getVerifiedDriverStatus: "rejected",
        };
      })
      .addCase(updateDriverVerify.pending, (state, action) => {
        return {
          ...state,
          updateDriverVerifyStatus: "pending",
        };
      })
      .addCase(updateDriverVerify.fulfilled, (state, action) => {
        return {
          ...state,
          updateDriverVerifyStatus: "success",
        };
      })
      .addCase(updateDriverVerify.rejected, (state, action) => {
        return {
          ...state,
          updateDriverVerifyStatus: "rejected",
        };
      })
      .addCase(getAllocatedVehicle.pending, (state, action) => {
        return {
          ...state,
          getAllocatedStatus: "pending"
        };
      })
      .addCase(getAllocatedVehicle.fulfilled, (state, action) => {
        return {
          ...state,
          allocatedVehicle: action.payload.vehicleRecords,
          getAllocatedStatus: "success"
        };
      })
      .addCase(getAllocatedVehicle.rejected, (state, action) => {
        return {
          ...state,
          getAllocatedStatus: "rejected"
        };
      })
      .addCase(makeVehicleAvailable.pending, (state, action) => {
        return {
          ...state,
          updateVehicleBookingStatus: "pending"
        };
      })
      .addCase(makeVehicleAvailable.fulfilled, (state, action) => {
        return {
          ...state,
          allocatedVehicle: action.payload.vehicleRecords,
          updateVehicleBookingStatus: "success"
        };
      })
      .addCase(makeVehicleAvailable.rejected, (state, action) => {
        return {
          ...state,
          updateVehicleBookingStatus: "rejected"
        };
      })
      .addCase(countingReport.pending, (state, action) => {
        return {
          ...state,
        };
      })
      .addCase(countingReport.fulfilled, (state, action) => {
        return {
          ...state,
          customerCount: action.payload.totalCutomers,
          driverCount: action.payload.totalDrivers,
          vehicleCount: action.payload.totalVehicles,
          verifiedDriverCount: action.payload.totalVerifiedDrivers,
          pendingBookingCount: action.payload.totalPendingBookings
        };
      })
      .addCase(countingReport.rejected, (state, action) => {
        return {
          ...state,
        };
      })
  },
});

export default adminWorkSlice.reducer;
