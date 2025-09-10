import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const Appcontext=createContext();
import{toast} from "react-toastify"
const AppContextProvider=(props)=>{
    const currencysymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const[doctors,setDoctors]=useState([]);
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):false);
    const [userData,setUserData]=useState(false);
    const getDoctorData= async ()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/doctor/list");
            if(data.success){
                setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const loadUserProfileData= async ()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/user/get-profile",{headers:{token}});
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getDoctorData();
    },[])
     useEffect(()=>{
        if(token)loadUserProfileData();
        else setUserData(false);
    },[token])
    const value={
        doctors
,currencysymbol,token,setToken,backendUrl,userData,setUserData,loadUserProfileData,getDoctorData
    }
    return(
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}
export default AppContextProvider