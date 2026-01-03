import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ChooseLanguage() {
  const [selectedLang, setSelectedLang] = useState('');
  const navigate = useNavigate();
  const API_BASE = "http://13.234.225.206:8080";

  const continueApp = async () => {
    const userMobile = localStorage.getItem("userMobile");

    if (!selectedLang) {
      alert("Please select a language to continue.");
      return;
    }

    if (!userMobile) {
      alert("User session not found. Please login again.");
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/save-language`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          mobile: userMobile, 
          language: selectedLang 
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Language set to: " + selectedLang);
        navigate('/'); // Redirect to your Main Chat/Landing Page
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4" 
         style={{ background: 'radial-gradient(circle at top, #1b1f3b, #0b0d1a)' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] p-10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] text-center"
        style={{ 
          background: 'rgba(255, 255, 255, 0.08)', 
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)' 
        }}
      >
        <h1 className="text-[28px] font-bold mb-[14px]">Choose Your Language</h1>
        <p className="text-[15px] leading-[1.6] text-[#cfd3ff] mb-[30px]">
          Select your preferred language to personalize your experience.
          This helps us deliver content that feels native, intuitive, and built for you.
        </p>

        <div className="relative mb-[30px]">
          <select 
            id="language"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full p-[14px_16px] rounded-[12px] border-none outline-none bg-white/15 text-white text-[15px] cursor-pointer appearance-none"
          >
            <option value="" disabled className="bg-[#1b1f3b]">Select language</option>
            
            {/* Global */}
            <option value="en" className="bg-[#1b1f3b]">English</option>
            <option value="es" className="bg-[#1b1f3b]">Spanish (Español)</option>
            <option value="fr" className="bg-[#1b1f3b]">French (Français)</option>
            <option value="de" className="bg-[#1b1f3b]">German (Deutsch)</option>
            <option value="pt" className="bg-[#1b1f3b]">Portuguese (Português)</option>
            <option value="it" className="bg-[#1b1f3b]">Italian (Italiano)</option>
            <option value="ja" className="bg-[#1b1f3b]">Japanese (日本語)</option>
            
            {/* Indian Languages */}
            <option value="hi" className="bg-[#1b1f3b]">Hindi (हिन्दी)</option>
            <option value="ta" className="bg-[#1b1f3b]">Tamil (தமிழ்)</option>
            <option value="te" className="bg-[#1b1f3b]">Telugu (తెలుగు)</option>
            <option value="kn" className="bg-[#1b1f3b]">Kannada (ಕನ್ನಡ)</option>
            <option value="ml" className="bg-[#1b1f3b]">Malayalam (മലയാളം)</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#cfd3ff] pointer-events-none">▾</div>
        </div>

        <motion.button 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={continueApp}
          className="w-full p-[14px] rounded-[14px] border-none text-[16px] font-semibold text-white cursor-pointer shadow-[0_12px_30px_rgba(108,99,255,0.45)]"
          style={{ background: 'linear-gradient(135deg, #6c63ff, #8f84ff)' }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
