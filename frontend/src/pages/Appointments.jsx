import React, { useContext, useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/context';
import { assets } from '../assets/assets';
import RelatedDoc from '../components/RelatedDoc';
import { toast } from 'react-toastify';
import axios from 'axios';

 const Appointments = () => {
  let {docId}=useParams();
  const {doctors,currencysymbol,backendUrl,token,getDoctorData}=useContext(Appcontext);
  const [docInfo,setDocInfo]=useState(null);
  const [docSlot,setDocSlot]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const[slotTime,setSlotTime]=useState([]);
  const navigate=useNavigate();
  const daysOfWeek=["SUN","MON","TUE","WED","THU","FRI","SAT"];
    const fetchDocInfo=async ()=>{
    const docInfo=doctors.find(doc=>doc._id===docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }
  const getAvailableSlot=async()=>{
    setDocSlot([]);

    //getting current date
    let today= new Date();
    for(let i =0;i<7;i++){
      let currentdate=new Date(today);
      currentdate.setDate(today.getDate()+i);
      //set end time 
      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);

      //setting hours
      if(today.getDate()===currentdate.getDate()){
        currentdate.setHours(currentdate.getHours()>10 ? currentdate.getHours()+1:10);
        currentdate.setMinutes(currentdate.getMinutes()>30?30:0);
      }
      else{
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }
      let timeslots=[];
      while(currentdate<endTime){
        let formattedTime=currentdate.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
        let day =currentdate.getDate();
        let month= currentdate.getMonth()+1;
        let year=currentdate.getFullYear();

        const slotDate=day+"_"+month+"_"+year;
        const slotTime=formattedTime;

        const isSlotAvailable=docInfo.slots_booked[slotDate]&& docInfo.slots_booked[slotDate].includes(slotTime)?false:true;


        if(isSlotAvailable){
        //add slot to array
        timeslots.push({
          dateTime:new Date(currentdate),
          time:formattedTime,
        })
      }
        // increment current time by 30 min 
        currentdate.setMinutes(currentdate.getMinutes()+30)
      }
      setDocSlot(prev=>([...prev,timeslots]));
    }
  }
  const bookAppointment=async()=>{
    try {
      if(!token){
        toast.warn("Login to book apppointment");
       return  navigate("/login") 
      }
      const date=docSlot[slotIndex][0].dateTime;
      let day=date.getDate();
      let month=date.getMonth()+1;
      let year= date.getFullYear();
      const slotDate=day+"_"+month+"_"+year;
      const {data}=await axios.post(backendUrl+"/api/user/book-appointment",{docId,slotDate,slotTime},{headers:{token}});
      if(data.success){
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
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
    fetchDocInfo();
  },[doctors,docId]);
  useEffect(()=>{
    getAvailableSlot();
  },[docInfo]);
  useEffect(()=>{console.log(docSlot)},[docSlot])
  return docInfo&&(
    <div>
      {/* doctor details */}
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
          <img className='primary w-full sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* doctor info name degree and experience  */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>
              {docInfo.degree}- {docInfo.speciality}
            </p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium texxt-gray-900 mt-3'>About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4 '>
             Appointment fee: <span className='text-gray-600'>{currencysymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot.map((item,index)=>{
           return <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ?"primary text-white":"border border-gray-200"}`} key={index}>
              <p>{item[0]&& daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p>{item[0]&&item[0].dateTime.getDate()}</p>
            </div>
          })}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime?"primary text-white":" text-gray-400 border border-gray-300"}`} key={index}>{item.time.toLowerCase()}</p>
          ))}
        </div>
        <button onClick={bookAppointment} className='primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>
      {/* adding related doctors */}
      <RelatedDoc docId={docId}speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointments
