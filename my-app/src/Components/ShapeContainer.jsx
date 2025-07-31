// components/ShapeContainer.jsx
"use client";

import { motion } from "framer-motion";

const ShapeContainer = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center p-4">
      {/* Background Shape */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg 
          viewBox="0 0 1440 900" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d3233" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <path 
            d="M0 120 Q200 0 400 100 T800 100 Q1200 200 1440 100 
         L1440 800 Q1240 900 1040 800 T640 800 Q240 700 0 800 Z"
            fill="url(#shapeGradient)"
          />
        </svg>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default ShapeContainer;