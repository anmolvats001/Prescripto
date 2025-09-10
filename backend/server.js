import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
//app config
const app= express();
const port =process.env.PORT || 4000;
connectDb();
connectCloudinary();
//middlewares  dj2pt0ki6   lbEPz-2g5YWb-Vg-M2_L5en3S2I

app.use(cors());
app.use(express.json());

//end point
app.use("/api/admin",adminRouter);
// http://localhost:4000/api/admin/add-doctor
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter);
app.get("/",(req,res)=>{
    res.send("api working");
})
app.listen(port,()=>console.log("Server Started",port))