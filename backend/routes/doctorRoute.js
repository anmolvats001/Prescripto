import express from "express"
import { AllAppointments, appointmentCancel, appointmentComplete, doctorList, loginDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authdoctor.js";

const doctorRouter=express.Router();

doctorRouter.get('/list',doctorList);
doctorRouter.post("/login",loginDoctor);
doctorRouter.get("/appointments",authDoctor,AllAppointments);
doctorRouter.post("/cancel-appointment",authDoctor,appointmentCancel)
doctorRouter.post("/complete-appointment",authDoctor,appointmentComplete)
export default doctorRouter;