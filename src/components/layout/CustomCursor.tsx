import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 600, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 600, damping: 35 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ x: springX, y: springY }}
    >
      <svg className="w-8 h-8 -translate-x-[2px] -translate-y-[2px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#cursor-shadow)">
          <path d="M8 8L36 18L22 23L16 38L8 8Z" fill="url(#cursor_grad)" stroke="#fff" strokeWidth="0.5" strokeLinejoin="round"/>
          <path d="M8 8L22 23" stroke="#ffffff" strokeOpacity="1" strokeWidth="1.5"/>
        </g>
        <defs>
          <linearGradient id="cursor_grad" x1="8" y1="8" x2="26" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#F5F7FF" />
            <stop offset="1" stopColor="#7C8CFF" />
          </linearGradient>
          <filter id="cursor-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
            <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.5"/>
            <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#7C8CFF" floodOpacity="0.3"/>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}
