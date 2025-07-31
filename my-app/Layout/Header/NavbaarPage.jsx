"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/CVA/Button"

const NavbaarPage = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const languages = ["English", "Spanish", "French"]

  const leftNavItems = ["Home", "About", "Service", "Media"]
  const rightNavItems = ["Blog", "FAQ", "Booking", "Contact"]

  return (
    <motion.nav initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{ duration: 1,delay:7 }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Language Selector */}
          <motion.div initial={{x:-400 , opacity:0}} animate={{x:0,opacity:1}} transition={{ duration: 2 ,delay:8 }}  className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg text-white hover:border-gray-400 transition-colors"
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
                      setSelectedLanguage(lang)
                      setIsLanguageOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors text-sm"
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Left Navigation */}
            <div className="flex items-center space-x-6">
              {leftNavItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Logo */}
            <div className="mx-8">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <img src="/Law_logo.png" alt="" />
              </motion.div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6">
              {rightNavItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Sign In Button */}
            <motion.button
  className="relative px-8 py-3 border border-gray-600 rounded-lg text-white overflow-hidden group"
  whileHover={{ scale: 1.05 }}
  initial={{ x: 400, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 2, delay: 8 }}
>
  {/* Black Background Fill */}
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

  {/* White Curved Overlay */}
  <motion.div
    className="absolute inset-0 bg-white z-0"
    style={{
      clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)",
    }}
    initial={{ x: "-100%" }}
    whileHover={{
      x: "0%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }}
  />

  {/* Foreground Text and Arrow */}
  <span className="relative z-10 flex items-center gap-2">
    <motion.span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
      Sign in
    </motion.span>
    <motion.span className="group-hover:rotate-90 transition-transform duration-300">
      →
    </motion.span>
  </span>
</motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

export default NavbaarPage
