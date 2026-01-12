import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [form, setForm] = useState({
    phoneNumber: "",
    address: "",
  });
const nagivate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        form
      );
      
      console.log("Backend Response:", res.data);

      // ✅ Save temp token (if backend sends it)
      if (res.data?.data?.tempToken) {
        localStorage.setItem("tempToken", res.data.data.tempToken);
      }
      
      nagivate('/verify');
      setMessage("OTP sent successfully ✅");

    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number (12 digits)"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Sending OTP..." : "Register"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600">
            {message}
          </p>
        )}
      </form>
      
    </div>
    
  );
}
