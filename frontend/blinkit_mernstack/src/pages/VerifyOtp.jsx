import { useState } from "react";
import axios from "axios";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const tempToken = localStorage.getItem("tempToken");
      console.log("temp token",tempToken)
      if (!tempToken) {
        alert("Token missing");
        return;
      }

  const res = await axios.post(
  "http://localhost:8000/api/v1/users/verify-otp",
  {
    tempToken,
    otp
  },
  {
    withCredentials: true   // ✅ correct
  }
);

      

      console.log("Verify Response:", res.data);
      alert("OTP Verified Successfully ✅");

    } catch (error) {
      console.error("OTP Verify Error:", error);
      
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <input
      
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default VerifyOtp;
