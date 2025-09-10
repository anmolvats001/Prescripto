import mongoose from "mongoose";

const connectDb=async ()=>{
    mongoose.connection.on("connected",()=>console.log("Database connnected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescriptoDataBase`);
    console.log("✅ Connected to:", mongoose.connection.name);
}
export default connectDb;