
import axios from "axios";

const API_KEY = "3d2cf2f8-ef0d-11f0-a6b2-0200cd936042";
const TEMPLATE = "TESTING";


export const sendOtp = async (phoneNumber , otp) => {
  try {
    const formattedPhone = phoneNumber.replace("+", "");
    

    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${formattedPhone}/${otp}/${TEMPLATE}`;
    console.log("Request URL:", url);
    console.log("Generated OTP:", otp);

    const response = await axios.get(url);

    if (response.data.Status !== "Success") {
      throw new Error(response.data.Details);
    }

    return {
      otp,                         // save in DB for verification
      sessionId: response.data.Details,
      success:response.data.Status,
      response:response
    };
  } catch (error) {
    const errorData = error.response?.data || error.message;

    console.error("Send OTP Error:", errorData);

    return {
      success: false,
      error: errorData,
    };
  }
};

// // ✅ Test
// (async () => {
//   try {
//     const result = await sendOtp("919531759601");   // no +
//     console.log("OTP Sent Successfully!");
//     console.log("OTP:", result.otp);
//     console.log("Session:", result.sessionId);
//   } catch (err) {
//     console.log("Failed:", err.message);
//   }
// })();





// import axios from "axios";

// const API_KEY = "3d2cf2f8-ef0d-11f0-a6b2-0200cd936042";
// const TEMPLATE = "TESTING";   // your approved template

// // Send OTP
// export const sendOtp = async (phoneNumber) => {
//   try {
//     const formattedPhone = phoneNumber.replace("+", "");

//     const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${formattedPhone}/AUTOGEN3/${TEMPLATE}`;
//     console.log("Request URL:", url);

//     const response = await axios.get(url);

//     if (response.data.Status !== "Success") {
//       throw new Error(response.data.Details);
//     }

//     return {
//       sessionId: response.data.Details,
//     };
//   } catch (error) {
//     console.error("Send OTP Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Verify OTP
// export const verifyOtp = async (sessionId, otp) => {
//   try {
//     const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;

//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Verify OTP Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // ✅ Test
// (async () => {
//   try {
//     const result = await sendOtp("919531759601"); // no + sign
//     console.log("OTP Sent Successfully!");
//     console.log("Session ID:", result.sessionId);
//   } catch (err) {
//     console.log("Failed:", err.message);
//   }
// })();
