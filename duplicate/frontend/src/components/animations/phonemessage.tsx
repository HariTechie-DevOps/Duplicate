import { motion } from 'motion/react';

interface PhoneMessageProps {
  originalMessage: string;
  translatedMessage: string;
  side: 'left' | 'right';
  delay: number;
}

export function PhoneMessage({ 
  originalMessage,
  translatedMessage,
  side, 
  delay,
}: PhoneMessageProps) {
  // Position messages near heads - top area of screen
  const position = side === 'right' 
    ? { right: '12%', top: '20%' } 
    : { left: '12%', top: '20%' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 30 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0.3, 1.05, 1, 0.9],
        y: [30, 0, 0, -15]
      }}
      transition={{
        duration: 4.5,
        delay,
        times: [0, 0.15, 0.75, 1],
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none z-30"
      style={position}
    >
      <div className="relative">
        <div className={`px-5 py-4 rounded-2xl backdrop-blur-xl shadow-2xl max-w-sm ${
          side === 'right' 
            ? 'bg-gradient-to-br from-blue-500/95 to-blue-600/95 text-white rounded-tr-sm' 
            : 'bg-gradient-to-br from-purple-500/95 to-purple-600/95 text-white rounded-tl-sm'
        }`}>
          {/* Translation (what receiver reads) - TOP */}
          <div className="mb-3">
            <p className="text-base font-semibold leading-relaxed">{translatedMessage}</p>
          </div>
          
          {/* Divider */}
          <div className="border-t border-white/30 my-2" />
          
          {/* Original message - BOTTOM */}
          <div>
            <p className="text-xs text-white/80 italic leading-relaxed">Original: {originalMessage}</p>
          </div>
        </div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl -z-10"
          animate={{
            boxShadow: [
              `0 0 25px ${side === 'right' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(168, 85, 247, 0.7)'}`,
              `0 0 45px ${side === 'right' ? 'rgba(59, 130, 246, 1)' : 'rgba(168, 85, 247, 1)'}`,
              `0 0 25px ${side === 'right' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(168, 85, 247, 0.7)'}`,
            ]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
