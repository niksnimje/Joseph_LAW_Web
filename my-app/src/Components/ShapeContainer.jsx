"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ShapeContainer = ({ children }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showShape, setShowShape] = useState(false);
  const languages = ["English", "Spanish", "French"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShape(true);
    }, 7000); // 7 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* For lg and above */}
      <div className="relative w-full h-screen bg-black hidden lg:block overflow-hidden">
        {/* Children content - always visible */}
        <div className="absolute inset-0">
          {children}
        </div>

        {/* Shape overlay - appears after 7 seconds */}
        <AnimatePresence>
          {showShape && (
            <motion.div
              className="absolute inset-0 border-t-[35px] border-x-[40px] border-black pointer-events-none "
              style={{ boxSizing: 'border-box' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left box - contains language button */}
              <div className="bg-black w-40 h-14 absolute z-51 rounded-br-2xl flex items-center justify-start pl-4 pointer-events-auto">
                <motion.div 
                  className="relative"
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: -20, y: 0, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                >
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex z-52 items-center bg-black space-x-2 px-6 py-2 rounded-lg text-white border border-gray-400 hover:border-gray-400 transition-colors ms-1 mb-2"
                  >
                    <span className="text-2xl">🇺🇸</span>
                    <span className="text-sm">{selectedLanguage}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-2 left-0 bg-black border border-gray-600 rounded-lg overflow-hidden min-w-[120px]"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors text-sm"
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Right box - contains signup button */}
              <div className="bg-black w-40 h-14 absolute z-50 right-0 rounded-bl-2xl flex items-center justify-end pointer-events-auto">
                <motion.button
                  className="relative px-8 py-3 border border-gray-600 rounded-lg text-white overflow-hidden group mb-2 me-6 w-40 h-14 -ms-3"
                  whileHover={{ scale: 1.05 }}
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 20, y: 0, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#1a1a1a] origin-left z-0"
                    initial={{ scaleX: 0 }}
                    whileHover={{
                      scaleX: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    style={{ transformOrigin: "left" }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-black z-0"
                    style={{
                      clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
                    }}
                    initial={{ x: "0" }}
                    whileHover={{
                      x: "0%",
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                  />

                  <span className="relative z-10 flex items-center">
                    <motion.span className="text-sm font-medium group-hover:text-white transition-colors duration-300 ps-2">
                      Sign in
                    </motion.span>
                    <motion.span className="group-hover:rotate-90 transition-transform duration-300">
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* For small screens - exactly same as before */}
      <div className="block lg:hidden w-full h-screen bg-black overflow-hidden">
        <div className="relative z-90 w-full h-full overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default ShapeContainer;