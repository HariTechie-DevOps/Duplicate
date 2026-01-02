import { motion } from 'motion/react';

interface MessageBubbleProps {
  originalText: string;
  translatedText: string;
  side: 'left' | 'right';
  delay: number;
}

export function MessageBubble({ 
  originalText,
  translatedText,
  side, 
  delay,
}: MessageBubbleProps) {
  // Position very close to heads
  const position = side === 'right' 
    ? { right: '18%', top: '25%' } 
    : { left: '18%', top: '25%' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1.08, 1, 0.85],
        y: [30, 0, 0, -15]
      }}
      transition={{
        duration: 4,
        delay,
        times: [0, 0.2, 0.75, 1],
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none z-30"
      style={position}
    >
      <div className="relative">
        <div className={`px-6 py-4 rounded-2xl backdrop-blur-xl shadow-2xl max-w-md ${
          side === 'right' 
            ? 'bg-gradient-to-br from-blue-500/95 to-blue-600/95 text-white rounded-tr-sm' 
            : 'bg-gradient-to-br from-purple-500/95 to-purple-600/95 text-white rounded-tl-sm'
        }`}>
          {/* Original text on TOP */}
          <div className="mb-3">
            <p className="text-base font-semibold leading-relaxed">{originalText}</p>
          </div>
          
          {/* Divider */}
          <div className="border-t border-white/30 my-2" />
          
          {/* Translation on BOTTOM */}
          <div>
            <p className="text-sm text-white/90 leading-relaxed">{translatedText}</p>
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
