import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useState, useEffect } from 'react';

// Page components
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SendOtp from './pages/SendOtp';
import ResetPassword from './pages/ResetPassword';
import ChooseLanguage from './pages/ChooseLanguage';

// Animation components
import { MessageBubble } from './components/animations/messagebubble';
import { AnimatedStars } from './components/animations/animatedstars';

const conversation = [
  { id: 1, receiver: 'right', originalText: "Hello! How are you?", translatedText: '元気だよ！あなたは？', senderLang: 'English', receiverLang: 'Japanese' },
  { id: 2, receiver: 'left', originalText: 'こんにちは！元気ですか？', translatedText: 'Hello! How are you?', senderLang: 'Japanese', receiverLang: 'English' },
  { id: 3, receiver: 'right', originalText: "I'm doing great! What about you?", translatedText: '元気だよ！あなたは？', senderLang: 'English', receiverLang: 'Japanese' },
  { id: 4, receiver: 'left', originalText: '私もとても良いです！', translatedText: "I'm very good too!", senderLang: 'Japanese', receiverLang: 'English' },
  { id: 5, receiver: 'right', originalText: "That's wonderful to hear!", translatedText: 'それは素晴らしい！', senderLang: 'English', receiverLang: 'Japanese' }
];

function CinematicLanding() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [dynamicLanguages, setDynamicLanguages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/languages') 
      .then((res) => res.json())
      .then((data) => setDynamicLanguages(data))
      .catch(() => setDynamicLanguages(['English', 'Japanese', 'Tamil', 'Hindi', 'French']));
  }, []);

  useEffect(() => {
    if (currentMessage >= conversation.length) {
      const timer = setTimeout(() => setShowLogo(true), 1000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCurrentMessage(prev => prev + 1), 4000);
    return () => clearTimeout(timer);
  }, [currentMessage]);

  const msg = conversation[currentMessage];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans"> 
      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
            <AnimatedStars />
            
            {/* BACKGROUND FIX: Using a deep space gradient instead of a broken PNG */}
            <div 
               className="absolute inset-0 w-full h-full -z-10" 
               style={{ 
                 background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' 
               }}
            />
            
            <AnimatePresence mode="wait">
              {msg && (
                <MessageBubble
                  key={currentMessage}
                  originalText={msg.originalText}
                  translatedText={msg.translatedText}
                  side={msg.receiver as 'left' | 'right'}
                  delay={0}
                />
              )}
            </AnimatePresence>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {conversation.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${index <= currentMessage ? 'w-12 bg-white' : 'w-6 bg-white/20'}`} 
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-center justify-center">
            <AnimatedStars />

            {/* BACKGROUND FIX: Using a vibrant radial glow instead of a broken PNG */}
            <div 
              className="absolute inset-0 w-full h-full -z-10 opacity-60" 
              style={{ 
                background: 'radial-gradient(circle at center, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
                filter: 'blur(60px)'
              }}
            />

            <div className="z-10 text-center px-4">
              <motion.h1 initial={{y: 20}} animate={{y:0}} className="text-white text-7xl md:text-9xl font-thin mb-4 tracking-tighter">UChat</motion.h1>
              <p className="text-white/70 text-lg md:text-2xl mb-12 font-light">Breaking barriers in real-time.</p>
              
              <button 
                onClick={() => navigate('/signin')}
                className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform mb-12 shadow-xl cursor-pointer"
              >
                Get Started
              </button>

              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {dynamicLanguages.map((lang, i) => (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.1 }}
                    key={lang} 
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-xs uppercase tracking-widest"
                  >
                    {lang}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CinematicLanding />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/send-otp" element={<SendOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/choose-language" element={<ChooseLanguage />} />
      </Routes>
    </Router>
  );
}

// CRITICAL RENDER LOGIC
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
