import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import './CursorFollower.css';

const CursorFollower = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleHoverStart = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.pricing-card') ||
        target.closest('.learn-card') ||
        target.closest('.testimonial-card')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <>
      <motion.div
        className={`cursor-follower ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{ x, y }}
      />
      <motion.div
        className={`cursor-dot ${isVisible ? 'visible' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
};

export default CursorFollower;
