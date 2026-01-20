import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='stricky bg-yellow-300 text-2xl top-0 z-50 shadow-sm'>
        <div className='flex items-center justify-between px-8 py-3 max-w-7xl mx-auto'>


             {/* Logo */}
             <Link to="/"  className='text-2xl font-bold text-blinkitGreen'> blinkit </Link>

             {/* Location */}
             <div className="hidden md:block text-sm">
                <p className='font-semibold' >Delivery in 10 mins</p>
                <p className='text-gray-500'>Kolkata, India</p>
             </div>

             {/* Search */}
             <div className='flex-1 mx-4'>
                <input type='text'  placeholder='Search for products'  className='w-full px-4 py-2 rounded-lg bg-gray-100 outline-none'/>
             </div>

            {/* Cart */}
            <button className='bg-blinkitGreen text-white px-4 py-2 rounded-lg'>
                Cart
            </button>


        </div>
      
    </div>
  )
}

export default Navbar
