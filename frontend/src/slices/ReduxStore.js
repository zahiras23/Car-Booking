import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User.slice";
import ForgotPasswordSlice from "./ForgotPassword.slice";
import AdminSlice from "./Admin.slice";
import AdminWorkSlice from "./AdminWork.slice";
import VehicleSlice from "./Vehicle.slice";
import BookingSlice from "./Booking.slice";
import DriverSlice from "./Driver.slice";
import FeedbackSlice from "./Feedback.slice";
import ProfileSlice from "./Profile.slice";

const store = configureStore({
  reducer: {
    userState: UserSlice,
    passwordState: ForgotPasswordSlice,
    adminState: AdminSlice,
    adminWorkState: AdminWorkSlice,
    vehicleState: VehicleSlice,
    bookingState: BookingSlice,
    driverState: DriverSlice,
    feedbackState: FeedbackSlice,
    profileState: ProfileSlice
  },
});

export default store;
