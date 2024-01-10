import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:4000/api/adminApi/";

const adminInitialState = {
  token: "",
  loginStatus: "",
  loginError: "",
  verifyStatus: "",
  verifyError: "",
  isLogout: "",
  logoutError: "",
  changeCurrentPasswordStatus: ""
};

//---login thunk
export const loginAdmin = createAsyncThunk(
  "adminSlice/loginAdmin",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const response = await axios.post(baseUrl + "loginAdmin", {
        email,
        password,
      });
      localStorage.setItem("email", email);
      return response.data;
    } catch (error) {
      const e = error.response.data.message;
      toast.error(e)
      return rejectWithValue(error.response.data);
    }
  }
);

//---Email Verification
export const adminVerify = createAsyncThunk(
  "adminSlice/adminVerify",
  async (otp, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(baseUrl + "adminValidate/otpVerify", {
        email,
        otp,
      });
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("role", "admin")
      return response.data;
    } catch (error) {
      const e = error.response.data.message;
      toast.error(e);
      return rejectWithValue(error.response.data);
    }
  }
);

//logout
export const logoutAdmin = createAsyncThunk(
  "adminSlice/logoutAdmin",
  async (userData = null, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      var config = {
        method: "post",
        url: `${baseUrl}logoutAdmin`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(config);
      console.log("res---" + (await response.data));
      localStorage.removeItem("token");
      localStorage.removeItem("email");
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

//Change Current password
export const changeCurrentPassword = createAsyncThunk(
  "adminSlice/changeCurrentPassword",
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

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: adminInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAdmin.pending, (state, action) => {
        return {
          ...state,
          loginStatus: "pending",
          loginError: "",
        };
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          token: action.payload.token,
          loginStatus: "success",
          loginError: "",
        };
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        return {
          ...state,
          loginStatus: "rejected",
          loginError: action.payload,
        };
      })
      .addCase(adminVerify.pending, (state, action) => {
        return {
          ...state,
          verifyStatus: "pending",
          verifyError: "",
        };
      })
      .addCase(adminVerify.fulfilled, (state, action) => {
        return {
          ...state,
          token: action.payload.token,
          verifyStatus: "success",
          verifyError: "",
        };
      })
      .addCase(adminVerify.rejected, (state, action) => {
        return {
          ...state,
          verifyStatus: "rejected",
          verifyError: action.payload,
        };
      })
      .addCase(logoutAdmin.pending, (state, action) => {
        return {
          ...state,
          isLogout: "pending",
          logoutError: "",
        };
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          isLogout: "success",
          loginStatus: "",
          verifyStatus: "",
          logoutError: "",
        };
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        return {
          ...state,
          isLogout: "rejected",
          logoutError: action.payload,
        };
      })
      .addCase(changeCurrentPassword.pending, (state, action) => {
        return {
          ...state,
          changeCurrentPasswordStatus: "pending"

        };
      })
      .addCase(changeCurrentPassword.fulfilled, (state, action) => {
        return {
          ...state,
          changeCurrentPasswordStatus: "success"

        };
      })
      .addCase(changeCurrentPassword.rejected, (state, action) => {
        return {
          ...state,
          changeCurrentPasswordStatus: "rejected"
        };
      })
  },
});

export default adminSlice.reducer;
