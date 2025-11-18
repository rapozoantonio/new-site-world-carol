'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AnimatedTextProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function AnimatedText({
  texts,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < targetText.length) {
            setCurrentText(targetText.slice(0, currentText.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  );
}
