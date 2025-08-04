"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ExploreButton = ({ text, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[120px] h-[40px] sm:w-[140px] sm:h-[45px] md:w-[155px] md:h-[50px] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-black text-sm sm:text-lg md:text-xl font-semibold rounded-lg overflow-hidden group "
    >
      {/* White fill animation */}
      <motion.div
        className="absolute inset-0 bg-white z-0"
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
        animate={{
          clipPath: isHovered
            ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
            : 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg p-[2px]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] rounded-lg" />
      </motion.div>

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full text-center">
        <span>{text}</span>
        <AnimatePresence>
          {!isHovered && (
            <motion.span
              className="bg-black text-white text-[12px] sm:text-[14px] md:text-[16px] p-0.5 sm:p-1 rounded-t-lg rounded-b-none absolute -right-5 sm:-right-6 -bottom-2 sm:-bottom-3"
              initial={{ x: 0, opacity: 1 }}
              exit={{
                x: 20,
                y: 20,
                opacity: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeIn",
                },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ➔
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default ExploreButton;