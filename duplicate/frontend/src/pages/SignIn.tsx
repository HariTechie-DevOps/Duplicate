import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('+91');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = "http://13.234.225.206:8080";

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      fetch(`${API_BASE}/api/login-with-token?token=${savedToken}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            navigate('/'); // Go to Landing Page
          } else {
            localStorage.removeItem("userToken");
          }
        });
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!mobile || !password) return alert("Enter credentials");
    setLoading(true);
    const fullMobile = code + mobile;

    fetch(`${API_BASE}/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: fullMobile, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("userMobile", fullMobile);
        if (rememberMe && data.token) localStorage.setItem("userToken", data.token);
        navigate('/choose-language');
      } else {
        alert("Failed: " + data.message);
      }
    })
    .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <label className="block text-sm font-semibold">Mobile</label>
        <div className="flex gap-2 mt-1 mb-4">
          <select value={code} onChange={(e) => setCode(e.target.value)} className="border p-2 rounded w-1/3">
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input className="border p-2 rounded w-full" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
        </div>
        <label className="block text-sm font-semibold">Password</label>
        <input type="password" underline-none className="border p-2 rounded w-full mt-1 mb-4" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-between text-xs mb-4">
          <label><input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} /> Remember me</label>
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/send-otp')}>Forgot password?</span>
        </div>
        <button disabled={loading} onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm mt-4">Create account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></p>
      </div>
    </div>
  );
}
