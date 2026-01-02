import { motion } from 'motion/react';

interface ChatBubbleProps {
  message: string;
  position: 'left' | 'right';
  delay: number;
  x?: number;
  y?: number;
}

export function ChatBubble({ message, position, delay, x = 0, y = 0 }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 20 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0.3, 1.05, 1, 0.9],
        y: [20, 0, 0, -10]
      }}
      transition={{
        duration: 4,
        delay,
        times: [0, 0.2, 0.7, 1],
        ease: "easeInOut"
      }}
      className="absolute"
      style={{
        left: position === 'left' ? `${x}px` : 'auto',
        right: position === 'right' ? `${x}px` : 'auto',
        top: `${y}px`,
      }}
    >
      <div className={`px-4 py-2 rounded-2xl backdrop-blur-sm shadow-lg ${
        position === 'left' 
          ? 'bg-blue-500/80 text-white rounded-tl-sm' 
          : 'bg-purple-500/80 text-white rounded-tr-sm'
      }`}>
        <p className="text-sm whitespace-nowrap">{message}</p>
      </div>
    </motion.div>
  );
}
