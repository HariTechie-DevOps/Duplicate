import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// Import your page components
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SendOtp from './pages/SendOtp';
import ResetPassword from './pages/ResetPassword';
import ChooseLanguage from './pages/ChooseLanguage';

// Import your custom cinematic components
import { MessageBubble } from './components/animations/messagebubble';
import { AnimatedStars } from './components/animations/animatedstars';
import chatSceneImg from './assets/chat-scene.png';
import logoSceneImg from './assets/logo-scene.png';

// Cinematic Data
const conversation = [
  { id: 1, receiver: 'right', originalText: "Hello! How are you?", translatedText: '元気だよ！あなたは？', senderLang: 'English', receiverLang: 'Japanese' },
  { id: 2, receiver: 'left', originalText: 'こんにちは！元気ですか？', translatedText: 'Hello! How are you?', senderLang: 'Japanese', receiverLang: 'English' },
  { id: 3, receiver: 'right', originalText: "I'm doing great! What about you?", translatedText: '元気だよ！あなたは？', senderLang: 'English', receiverLang: 'Japanese' },
  { id: 4, receiver: 'left', originalText: '私もとても良いです！', translatedText: "I'm very good too!", senderLang: 'Japanese', receiverLang: 'English' },
  { id: 5, receiver: 'right', originalText: "That's wonderful to hear!", translatedText: 'それは素晴らしい！', senderLang: 'English', receiverLang: 'Japanese' }
];

// --- CINEMATIC LANDING COMPONENT ---
function CinematicLanding() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [dynamicLanguages, setDynamicLanguages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://13.234.225.206:8080/api/languages') 
      .then((res) => res.json())
      .then((data) => setDynamicLanguages(data))
      .catch(() => setDynamicLanguages(['English', 'Japanese', 'Tamil', 'Hindi', 'French']));
  }, []);

  useEffect(() => {
    if (currentMessage >= conversation.length) {
      setTimeout(() => setShowLogo(true), 1000);
      return;
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
            <img src={chatSceneImg} className="absolute inset-0 w-full h-full object-cover" />
            {msg && (
              <MessageBubble
                originalText={msg.originalText}
                translatedText={msg.translatedText}
                side={msg.receiver as 'left' | 'right'}
                delay={0}
              />
            )}
          </motion.div>
        ) : (
          <motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-center justify-center">
            <AnimatedStars />
            <img src={logoSceneImg} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="z-10 text-center">
              <h1 className="text-white text-8xl font-thin mb-4">UChat</h1>
              <p className="text-white/80 text-xl mb-12">Break language barriers.</p>
              
              <button 
                onClick={() => navigate('/signin')}
                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all mb-8"
              >
                Get Started
              </button>

              <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                {dynamicLanguages.map((lang) => (
                  <div key={lang} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm">{lang}</div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAIN APP ROUTER ---
export default function App() {
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

// --- RENDER LOGIC (CRUCIAL FOR BUILD) ---
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
