import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SendOtp() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const API_BASE = "http://52.66.154.31:8080";

  const handleSend = () => {
    fetch(`${API_BASE}/api/password/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "+91" + mobile })
    }).then(res => res.json()).then(data => {
      if (data.success) { setShowOtp(true); alert("Check terminal for OTP"); }
    });
  };

  const handleVerify = () => {
    fetch(`${API_BASE}/api/password/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: "+91" + mobile, otp })
    }).then(res => res.json()).then(data => {
      if (data.success) navigate(`/reset-password?mobile=+91${mobile}`);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Reset OTP</h2>
        <input className="border p-2 w-full mb-4" placeholder="Mobile" onChange={e => setMobile(e.target.value)} />
        {!showOtp ? (
          <button onClick={handleSend} className="bg-blue-600 text-white w-full p-2 rounded">Send OTP</button>
        ) : (
          <>
            <input className="border p-2 w-full mb-4" placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} />
            <button onClick={handleVerify} className="bg-green-600 text-white w-full p-2 rounded">Verify & Proceed</button>
          </>
        )}
      </div>
    </div>
  );
}
