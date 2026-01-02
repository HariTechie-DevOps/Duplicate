import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { MessageBubble } from './components/MessageBubble';
import { AnimatedStars } from './components/AnimatedStars';
import chatSceneImg from 'figma:asset/99517f0890f8e08f29d063b1abb87002507d92e3.png';
import logoSceneImg from 'figma:asset/3c8a9035f72e3d6f3bf8be4b238152d34ac4f7fa.png';

// 5 message conversation - Girl (Japanese) ↔ Boy (English)
const conversation = [
  {
    id: 1,
    receiver: 'right', // Girl receives
    originalText: "Hello! How are you?",
    translatedText: '元気だよ！あなたは？',
    senderLang: 'English',
    receiverLang: 'Japanese'
  },
  {
    id: 2,
    receiver: 'left', // Boy receives
    originalText: 'こんにちは！元気ですか？',
    translatedText: 'Hello! How are you?',
    senderLang: 'Japanese',
    receiverLang: 'English'
  },
  {
    id: 3,
    receiver: 'right', // Girl receives
    originalText: "I'm doing great! What about you?",
    translatedText: '元気だよ！あなたは？',
    senderLang: 'English',
    receiverLang: 'Japanese'
  },
  {
    id: 3,
    receiver: 'left', // Boy receives
    originalText: '私もとても良いです！',
    translatedText: "I'm very good too!",
    senderLang: 'Japanese',
    receiverLang: 'English'
  },
  {
    id: 4,
    receiver: 'right', // Girl receives
    originalText: "That's wonderful to hear!",
    translatedText: 'それは素晴らしい！',
    senderLang: 'English',
    receiverLang: 'Japanese'
  },
  {
    id: 5,
    receiver: 'left', // Boy receives
    originalText: 'ありがとう！また話しましょう',
    translatedText: "Thank you! Let's talk again",
    senderLang: 'Japanese',
    receiverLang: 'English'
  },
];

export default function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (currentMessage >= conversation.length) {
      // All messages done, show logo
      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 1000);
      return () => clearTimeout(logoTimer);
    }

    // Show message for 4 seconds then move to next
    const timer = setTimeout(() => {
      setCurrentMessage(prev => prev + 1);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentMessage]);

  const msg = conversation[currentMessage];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
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
            {/* Background with stars */}
            <AnimatedStars />
            
            {/* Chat scene image */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 30, ease: "linear" }}
            >
              <img 
                src={chatSceneImg} 
                alt="Two people chatting under the stars"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

            {/* Language indicator */}
            {msg && (
              <motion.div
                key={`indicator-${currentMessage}`}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                    <p className="text-white/90 text-sm">{msg.senderLang}</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                    <p className="text-white/90 text-sm">{msg.receiverLang}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Messages - showing on receiver's side near their head */}
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

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="flex gap-2">
                {conversation.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index < currentMessage 
                        ? 'bg-white/80 w-8' 
                        : index === currentMessage 
                        ? 'bg-white/60 w-12' 
                        : 'bg-white/20 w-6'
                    }`}
                    initial={{ width: '1.5rem' }}
                    animate={{ 
                      width: index === currentMessage ? '3rem' : index < currentMessage ? '2rem' : '1.5rem',
                      opacity: index <= currentMessage ? 1 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Message counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10"
            >
              <p className="text-white/60 text-xs tracking-wider">
                Message {Math.min(currentMessage + 1, conversation.length)} of {conversation.length}
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="logo-scene"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            {/* Background with stars */}
            <AnimatedStars />
            
            {/* Logo scene image */}
            <motion.div className="absolute inset-0">
              <img 
                src={logoSceneImg} 
                alt="UChat Logo Background"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Animated logo text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-center mb-12"
              >
                <motion.h1 
                  className="text-white mb-6"
                  style={{ fontSize: '7rem', fontWeight: 200, letterSpacing: '0.05em' }}
                  animate={{ 
                    textShadow: [
                      '0 0 30px rgba(255,255,255,0.4)',
                      '0 0 60px rgba(255,255,255,0.7)',
                      '0 0 30px rgba(255,255,255,0.4)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  UChat
                </motion.h1>
                <motion.p 
                  className="text-white/90 text-2xl tracking-wide max-w-2xl mx-auto px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Experience the next generation of communication
                </motion.p>
              </motion.div>

              {/* Floating language badges */}
              <motion.div 
                className="flex flex-wrap gap-3 justify-center max-w-4xl px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {[
                  'English',
                  'Español',
                  'Français',
                  'Deutsch',
                  '日本語',
                  '中文',
                  'العربية',
                  'Português',
                  'Italiano',
                  'Русский'
                ].map((language, index) => (
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.3 + (index * 0.08),
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="relative group cursor-pointer"
                  >
                    <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg transition-all group-hover:bg-white/20 group-hover:border-white/40">
                      <span className="text-white/95 text-sm tracking-wide">{language}</span>
                    </div>
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-12 text-white/70 text-base tracking-wide"
              >
                Break language barriers. Connect globally.
              </motion.p>
            </div>

            {/* Pulsing ambient glow effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 50% 40%, rgba(147, 197, 253, 0.15) 0%, transparent 60%)',
                  'radial-gradient(circle at 50% 40%, rgba(196, 181, 253, 0.15) 0%, transparent 60%)',
                  'radial-gradient(circle at 50% 40%, rgba(147, 197, 253, 0.15) 0%, transparent 60%)',
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
