import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { MessageBubble } from './components/animations/messagebubble'; // Updated paths
import { AnimatedStars } from './components/animations/animatedstars'; // Updated paths
import chatSceneImg from './assets/chat-scene.png'; // Use local assets
import logoSceneImg from './assets/logo-scene.png'; // Use local assets

// 5 message conversation - Static for the cinematic intro
const conversation = [
  {
    id: 1,
    receiver: 'right',
    originalText: "Hello! How are you?",
    translatedText: '元気だよ！あなたは？',
    senderLang: 'English',
    receiverLang: 'Japanese'
  },
  {
    id: 2,
    receiver: 'left',
    originalText: 'こんにちは！元気ですか？',
    translatedText: 'Hello! How are you?',
    senderLang: 'Japanese',
    receiverLang: 'English'
  },
  {
    id: 3,
    receiver: 'right',
    originalText: "I'm doing great! What about you?",
    translatedText: '元気だよ！あなたは？',
    senderLang: 'English',
    receiverLang: 'Japanese'
  },
  {
    id: 4,
    receiver: 'left',
    originalText: '私もとても良いです！',
    translatedText: "I'm very good too!",
    senderLang: 'Japanese',
    receiverLang: 'English'
  },
  {
    id: 5,
    receiver: 'right',
    originalText: "That's wonderful to hear!",
    translatedText: 'それは素晴らしい！',
    senderLang: 'English',
    receiverLang: 'Japanese'
  }
];

export default function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  
  // NEW: State for languages fetched from Spring Boot
  const [dynamicLanguages, setDynamicLanguages] = useState<string[]>([]);

  // 1. Fetch languages from your Spring Boot Controller
  useEffect(() => {
    fetch('http://localhost:8080/api/languages')
      .then((res) => res.json())
      .then((data) => {
        setDynamicLanguages(data);
      })
      .catch((err) => {
        console.error("Backend not reachable, using defaults", err);
        setDynamicLanguages(['English', 'Japanese', 'Spanish', 'French', 'German']);
      });
  }, []);

  // 2. Control the cinematic conversation timer
  useEffect(() => {
    if (currentMessage >= conversation.length) {
      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 1000);
      return () => clearTimeout(logoTimer);
    }

    const timer = setTimeout(() => {
      setCurrentMessage(prev => prev + 1);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentMessage]);

  const msg = conversation[currentMessage];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div
            key="chat-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <AnimatedStars />
            
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 30, ease: "linear" }}
            >
              <img 
                src={chatSceneImg} 
                alt="Chat Scene"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

            {/* Language indicator */}
            {msg && (
              <motion.div
                key={`indicator-${currentMessage}`}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                  <span className="text-white/90 text-sm font-medium">{msg.senderLang}</span>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                  <span className="text-white/90 text-sm font-medium">{msg.receiverLang}</span>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <AnimatePresence mode="wait">
              {msg && (
                <motion.div key={`message-${currentMessage}`}>
                  <MessageBubble
                    originalText={msg.originalText}
                    translatedText={msg.translatedText}
                    side={msg.receiver as 'left' | 'right'}
                    delay={0}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Bars */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {conversation.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1.5 rounded-full"
                  animate={{ 
                    width: index === currentMessage ? 48 : index < currentMessage ? 32 : 24,
                    backgroundColor: index <= currentMessage ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)"
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="logo-scene"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full flex flex-col items-center justify-center"
          >
            <AnimatedStars />
            <img src={logoSceneImg} className="absolute inset-0 w-full h-full object-cover opacity-60" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center z-10"
            >
              <h1 className="text-white text-8xl font-thin tracking-tighter mb-4">UChat</h1>
              <p className="text-white/80 text-xl mb-12">Break language barriers. Connect globally.</p>
              
              {/* Dynamic Language Badges from Spring Boot */}
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl px-4">
                {dynamicLanguages.map((lang, i) => (
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm"
                  >
                    {lang}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
