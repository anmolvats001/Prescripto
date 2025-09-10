import express from "express"
import { bookAppointment, cancelAppointments, getProfileData, listAppointments, loginUser, paymentRazorPay, registerUser, updateProfile } from "../controllers/userController.js"
import authUser from "../middleware/authUser.js"
import upload from "../middleware/multer.js";
let userRouter= express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/get-profile",authUser,getProfileData);
userRouter.post("/update-profile",upload.single("image"),authUser,updateProfile);
userRouter.post("/book-appointment",authUser,bookAppointment);
userRouter.get("/appointments",authUser,listAppointments)
userRouter.post("/cancel-appointment",authUser,cancelAppointments);
userRouter.post("/payment-razorpay",authUser,paymentRazorPay)
export default userRouter;