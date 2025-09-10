import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='md:flex justify-between gap-14 my-10 mt-40 text-sm'>
        {/* left section  */}
        <div className='md:w-[500px] sm:w-full'> 
            <img className='mb-5 w-40 ' src={assets.logo} alt="" />
            <p className='w-[full] text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* center section  */}
        <div className='mt-9 sm:mt-0 '>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        {/* right section  */}
        <div className='mt-9 sm:mt-0 '>
            <p className='text-xl font-medium mb-5'>Get-In-Touch </p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>greatstackdev@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        {/* copyright text  */}
        <hr />
        <p className='py-5 text-sm text-center text-gray-600'>Copyright © 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
