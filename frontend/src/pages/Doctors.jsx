import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams}from "react-router-dom"
import { Appcontext } from '../context/context';
function Doctors() {
  const {speciality}=useParams();
  const {doctors}=useContext(Appcontext);
  const [filterDoc,setFilterDoc]=useState([]);
  const [showFilter,setShowFilter]=useState(false);
  const navigate=useNavigate();
  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality==speciality));
    }
    else{
      setFilterDoc(doctors);
    }
  }
  useEffect(()=>{
    applyFilter();
  },[doctors,speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border text-sm rounded transition-all sm:hidden ${showFilter ? "primary text-white":""}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={` ${showFilter ?"flex":"hidden sm:flex"}  flex-col gap-4  text-sm text-gray-600`}>
          <p onClick={()=>speciality==="General physician"?navigate("/doctors"):navigate("/doctors/General physician/")} className={`w-[95vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer pr-15 ${speciality==="General physician"?"bg-indigo-100 text-black":""}`}>General physician</p>
          <p onClick={()=>speciality==="Gynecologist"?navigate("/doctors"):navigate("/doctors/Gynecologist")} className={`w-[95vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer pr-15 ${speciality==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==="Dermatologist"?navigate("/doctors"):navigate("/doctors/Dermatologist")} className={`w-[95vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer pr-15 ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==="Pediatricians"?navigate("/doctors"):navigate("/doctors/Pediatricians")} className={`w-[95vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer pr-15 ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality==="Neurologist"?navigate("/doctors"):navigate("/doctors/Neurologist")} className={`w-[95vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer pr-15 ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==="Gastroenterologist"?navigate("/doctors"):navigate("/doctors/Gastroenterologist")} className={`w-[95vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer pr-15 ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full flex felx-col gap-4 gap-y-6 flex-wrap'>
          {
            filterDoc.map((item,index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500 lg:w-[201px] md:w-[180px] h-fit md:flex-shrink-0 lg:flex-shrink-0'>
                    <img className='bg-blue-50 ' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className=' w-2 h-2 bg-green-500 rounded-full'></p><p>Availabe</p>
                        </div>
                        <p className='text-gray-900 font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
