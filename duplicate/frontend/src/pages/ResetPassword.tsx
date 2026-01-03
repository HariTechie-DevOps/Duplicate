import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const mobile = searchParams.get('mobile');

  const handleReset = () => {
    fetch(`http://13.234.225.206:8080/api/password/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, password })
    }).then(() => { alert("Success!"); navigate('/signin'); });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="font-bold mb-4">New Password</h2>
        <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-4" />
        <button onClick={handleReset} className="bg-blue-600 text-white w-full p-2 rounded">Reset</button>
      </div>
    </div>
  );
}
