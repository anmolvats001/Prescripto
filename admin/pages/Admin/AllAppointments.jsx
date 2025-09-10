import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const {atoken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext);
  const {calculateAge,slotdateformat,currency}=useContext(AppContext)
  useEffect(()=>{
    if(atoken){
      getAllAppointments();
    }
  },[atoken])
  return (
    <div className='w-full max-w-6xl m-5'> 
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border-rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>patient</p>
          <p>Age</p>
          <p>date & time</p>
          <p>doctor</p>
          <p>fees</p>
          <p>action</p>
        </div>
        {appointments.map((item,index)=>{
         return <div className='flex felx-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden '>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className=' rounded-full w-8' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='mx:sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotdateformat(item.slotDate)},{item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className=' rounded-full w-8 bg-gray-200' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ?<p className=' text-red-400 text-sm font-medium'>Cancelled</p>:<img onClick={()=>cancelAppointment(item._id)} className=' cursor-pointer w-10' src={assets.cancel_icon} alt="" />}
          </div>
        })}
      </div>
    </div>
  )
}

export default AllAppointments
