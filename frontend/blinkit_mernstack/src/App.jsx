import React from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
function App() {
  const handleGetUser = async () =>{
    try {

    const res = await axios.get(
  "http://localhost:8000/api/v1/users/current-user",
        {
          withCredentials: true   // ✅ VERY IMPORTANT
        }

)
  
  console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      { withCredentials: true }   // ✅ must send cookies
    );

    alert("Logged out successfully ✅");

  } catch (error) {
    console.log("Logout failed ❌", error.response?.data || error.message);
  }
};

  return (
    <>
    <h1 className='text-2xl bg-red-600 font-bold'>TESTING THE API</h1>
    <Outlet/>
    <button onClick={handleGetUser} 
    className='p-4 mt-10 bg-red-600'>Get currect user</button>
    <br></br>
    <button onClick={handleLogout} 
    className='p-4 mt-4 bg-red-600'>logout</button>
    </>
  )
}

export default App