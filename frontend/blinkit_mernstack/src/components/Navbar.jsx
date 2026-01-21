import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // change to true after login



  return (
    <header className='stickey top-0 z-50 bg-white border-b'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center gap-4'>
           
            {/* Logo */}
            <Link
              to ="/"
              className='text-2xl font-extrabold text-[#0C831F]'
            >
              <span className='text-yellow-500'>Blink</span>it
            </Link>

             
            {/* Delivery Info */}
            <div className='hidden md:flex flex-col text-sm leading-tight'>
              <span className='font-semibold'>Delivery in 10 minutes</span>
              <span className='text-gray-500'>Kolkata, West Bengal</span>
            </div>

            {/* Search Bar */}
            <div className='flex flex-1 relative'>
              <span className="material-symbols-outlined text-gray-500"> search</span>
              <input
                  type='text'
                  placeholder='Search for atta, dal, coke and more'
                  className='w-full bg-gray-100 rounded-xl pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#0C831F]'
              />
              
            </div>

            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block text-sm font-medium"
            >
              Login
            </button>


            {/* Cart */}
            <button 
                className={`relative px-4 py-2 rounded-xl font-medium text-white
                         ${
                           isLoggedIn
                              ? "bg-[#0C831F] cursor-pointer"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                onClick={()=>{
                  if(!isLoggedIn) return; //block click
                  navigate("/mycart");
                }}          
            >    
             My Cart

            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
               0
            </span>
            </button>
           



                 





      </div>
    </header>
  )
}

export default Navbar
