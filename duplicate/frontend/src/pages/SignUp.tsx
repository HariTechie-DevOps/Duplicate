import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', mobile: '', password: '', code: '+91' });
  const navigate = useNavigate();
  const API_BASE = "http://52.66.154.31:8080";

  const handleSignup = () => {
    const fullMobile = formData.code + formData.mobile;
    fetch(`${API_BASE}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, mobile: fullMobile })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Signup successful!");
        navigate('/signin');
      } else {
        alert(data.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <input className="border p-2 rounded w-full mb-3" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="number" className="border p-2 rounded w-full mb-3" placeholder="Age" onChange={e => setFormData({...formData, age: e.target.value})} />
        <select className="border p-2 rounded w-full mb-3" onChange={e => setFormData({...formData, gender: e.target.value})}>
          <option value="">Select Gender</option>
          <option>Male</option><option>Female</option>
        </select>
        <div className="flex gap-2 mb-3">
            <select value={formData.code} className="border p-2 rounded w-1/3" onChange={e => setFormData({...formData, code: e.target.value})}><option>+91</option></select>
            <input className="border p-2 rounded w-full" placeholder="Mobile" onChange={e => setFormData({...formData, mobile: e.target.value})} />
        </div>
        <input type="password" className="border p-2 rounded w-full mb-4" placeholder="Strong Password" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button onClick={handleSignup} className="w-full bg-blue-600 text-white p-2 rounded">Sign Up</button>
        <p className="text-center text-sm mt-4">Have account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>Sign In</span></p>
      </div>
    </div>
  );
}
