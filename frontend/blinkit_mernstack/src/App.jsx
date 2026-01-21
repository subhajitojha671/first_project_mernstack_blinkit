import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import Footer from "./components/Footer.jsx";


/* =======================
   AXIOS INSTANCE

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // send cookies automatically
});

/* =======================
   AXIOS INTERCEPTOR (SIMPLE)

api.interceptors.response.use(
  (response) => {console.log("response", response);
     return response},
  async (error) => {
    const originalRequest = error.config;
    console.log(" org " , originalRequest ,"error", error )
    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh token API
        await api.post("/users/refresh-access-token");

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token also expired
      //  window.location.href = "/login";
      
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* =======================
   APP COMPONENT
======================= */

function App() {

  // const handleGetUser = async () => {
  //   try {
  //     const res = await api.get("/users/current-user");
  //     console.log("User:", res.data);
  //   } catch (error) {
  //     console.log("Get user error:", error.response?.data || error.message);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/users/logout");
  //     alert("Logged out successfully ✅");
  //   } catch (error) {
  //     console.log("Logout error:", error.response?.data || error.message);
  //   }
  // };

  return (
    <>
    {/* <h1 className='text-2xl bg-red-600 font-bold'>TESTING THE API</h1>
    <Outlet/>
    <button onClick={handleGetUser} 
    className='p-4 mt-10 bg-red-600'>Get currect user</button>
    <br></br>
    <button onClick={handleLogout} 
    className='p-4 mt-4 bg-red-600'>logout</button> */}
    <Navbar/>
    <AppRoutes/>
    <Footer/>
    </>
  );
}

export default App;
