import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointMentModel.js";
import userModel from "../models/userModel.js";
// api for adding doctor
const addDoctor=async(req,res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const imageFile=req.file;
        
        //checking for all data to add doctor
        if(!name || !email || !password || !speciality ||!degree || !experience || !about ||!fees || !address){
            return res.json ({success:false,"message":"missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json ({success:false,"message":"invalid email"})
        }
        if(password.length<8){
            return res.json ({success:false,"message":"please enter the strong password"})
        }
        // hashing doc password

        const salt =await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        
        //upload image to cloudinary
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl=imageUpload.secure_url;
        const doctorData={
            name,email,image:imageUrl,password:hashPassword,speciality,degree,experience,about,fees,address:JSON.parse(address),date:Date.now()
        }
        const newDoc=new doctorModel(doctorData);
        await newDoc.save();
        res.json({success:true,message:"Doctor Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error occured"})
    }
}
// api for admin login
const loginAdmin=async (req,res)=>{
    try {
        let {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }
        else{res.json({success:false,message:"invalid credentail"})}
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// api to get all doctors list 
const allDoctors= async(req,res)=>{
    try {
        const doctors= await doctorModel.find({}).select("-password");
        res.json({success:true,doctors});
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api to get all appointment list
const appointmentsAdmin=async(req,res)=>{
    try {
        const appointments=await appointmentModel.find({});
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// appointment cancellation
const AppointmentCancel=async (req,res)=>{
    try {
        
        const {appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
        console.log(appointmentData)
        //releasing doctor slot 
        const {docId,slotDate,slotTime}=appointmentData;
        const doctorData=await doctorModel.findById(docId);
        let slots_booked=doctorData.slots_booked;
        slots_booked[slotDate]=slots_booked[slotDate].filter((e)=>e!==slotTime);
        await doctorModel.findByIdAndUpdate(docId,{slots_booked});
        res.json({success:true,message:"Appointment cancelled"});
    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false});
    }
}

//dashborad data
const adminDashBoard=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({});
        const users=await userModel.find({});
        const appointments=await appointmentModel.find({});

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData});
    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false});
    }
}
export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,AppointmentCancel,adminDashBoard}