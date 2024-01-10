import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


let baseUrl = "http://localhost:4000/api/vehicleApi/"


const vehicleInitialState = {
  newVehicleStatus: "",
  newVehicleError: "",
  vehicles: [],
  getVehicleStatus: "",
  getVehicleError: "",
  isDeleteVehicle: false,
  oneVehicleStatus: "",
  oneVehicleRecord: [],
  editVehicleStatus: "",
};

//---Add New Vehicle
export const addVehicle = createAsyncThunk(
  "vehicleSlice/addVehicle",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("add...")
      var config = {
        method: 'POST',
        url: `${baseUrl}registerVehicle`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,

        },
        data: formData
      };
      const response = await axios(config);
      toast.success("New Vehicle added successfully.")
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//---get vehicle by vehicle types
export const getVehicle = createAsyncThunk(
  "vehicleSlice/getVehicle",
  async (vehicleType, { rejectWithValue }) => {
    try {
      let role = localStorage.getItem("role")
      baseUrl = role === "customer" ? "http://localhost:4000/api/userApi/" : "http://localhost:4000/api/vehicleApi/"
      const token = localStorage.getItem("token");

      var config = {
        method: 'POST',
        url: `${baseUrl}getVehicleByType`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { vehicleType }
      };
      const response = await axios(config)
      return response.data;

    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//delete vehicle
export const deleteVehicle = createAsyncThunk(
  "vehicleSlice/deleteVehicle ",
  async (vehicleData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const { vehicleId, type } = vehicleData
      var config = {
        method: 'DELETE',
        url: `${baseUrl}deleteVehicle/${vehicleId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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

//get vehicle
export const getOneVehicle = createAsyncThunk(
  "vehicleSlice/getOneVehicle ",
  async (vid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      var config = {
        method: 'POST',
        url: `${baseUrl}getVehicleById/${vid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios(config)
      toast.success(response.data.message)
      return response.data;

    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editVehicle = createAsyncThunk(
  "vehicleSlice/editVehicle",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const vid = formData.get("vid");
      var config = {
        method: 'PATCH',
        url: `${baseUrl}editVehicle/${vid}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: formData
      };
      const response = await axios(config);
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicleSlice",
  initialState: vehicleInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addVehicle.pending, (state, action) => {
        return {
          ...state,
          newVehicleStatus: "pending",
          newVehicleError: ""
        };
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        return {
          ...state,
          newVehicleStatus: "success",
          newVehicleError: ""
        };
      })
      .addCase(addVehicle.rejected, (state, action) => {
        return {
          ...state,
          newVehicleStatus: "rejected",
          newVehicleError: action.payload,
        };
      })
      .addCase(getVehicle.pending, (state, action) => {
        return {
          ...state,
          getVehicleStatus: "pending",
          getVehicleError: ""
        };
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        return {
          ...state,
          vehicles: action.payload.vehicles,
          getVehicleStatus: "success",
          getVehicleError: ""
        };
      })
      .addCase(getVehicle.rejected, (state, action) => {
        return {
          ...state,
          getVehicleStatus: "rejected",
          getVehicleError: action.payload,
        };
      })
      .addCase(deleteVehicle.pending, (state, action) => {
        return {
          ...state
        };
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        return {
          ...state,
          isDeleteVehicle: true
        };
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        return {
          ...state
        };
      })
      .addCase(getOneVehicle.pending, (state, action) => {
        return {
          ...state,
          oneVehicleStatus: "pending"
        };
      })
      .addCase(getOneVehicle.fulfilled, (state, action) => {
        return {
          ...state,
          oneVehicleRecord: action.payload.record,
          oneVehicleStatus: "success"
        };
      })
      .addCase(getOneVehicle.rejected, (state, action) => {
        return {
          ...state,
          oneVehicleStatus: "rejected"
        };
      })
      .addCase(editVehicle.pending, (state, action) => {
        return {
          ...state,
          editVehicleStatus: "pending"
        };
      })
      .addCase(editVehicle.fulfilled, (state, action) => {
        return {
          ...state,
          editVehicleStatus: "success"
        };
      })
      .addCase(editVehicle.rejected, (state, action) => {
        console.log("error")
        console.log(action.payload)
        return {
          ...state,
          editVehicleStatus: "rejected"
        };
      })
  },
});

export default vehicleSlice.reducer;
