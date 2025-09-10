import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointMentModel.js";
const changeAvailability = async (req,res)=>{
    try {
        const {docId}=req.body;
        const docData= await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{avialable:!docData.avialable});
        res.json({message:"Avaialable changed",success:true})
    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false})
    }
}
const doctorList=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select(["-password","-email"]);
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false})
    }
}
const loginDoctor=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const doctor=await doctorModel.findOne({email});
        if(!doctor){
            return res.json({success:false,message:"can't find the doctor"});
        }
        let check= await bcrypt.compare(password,doctor.password);
        if(!check){
            return res.json({success:false,message:"Wrong password"});
        }
        const token = await jwt.sign({id:doctor._id},process.env.JWT_SECRET);
        res.json({success:true,token}) 
    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false})
    }
}
const AllAppointments=async(req,res)=>{
    try {
        const {docId}=req.body;
        const appointments=await appointmentModel.find({docId});
        res.json({success:true,appointments});
    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false})
    }
}
// appointment complete
const appointmentComplete=async(req,res)=>{
    try {
        const {docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.json({success:true,message:"Appointment completed"});
        }
        else{
            return res.json({success:false,message:"Mark Failed"});
        }
    } catch (error) {
         console.log(error);
        res.json({message:error.message,success:false})
    }
}
const appointmentCancel=async(req,res)=>{
    try {
        const {docId,appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.json({success:true,message:"Appointment cancelled"});
        }
        else{
            return res.json({success:false,message:"Mark Failed"});
        }
    } catch (error) {
         console.log(error);
        res.json({message:error.message,success:false})
    }
}
export {changeAvailability,doctorList,loginDoctor,AllAppointments,appointmentCancel,appointmentComplete}