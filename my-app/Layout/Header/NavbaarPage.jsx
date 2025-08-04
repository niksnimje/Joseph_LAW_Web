"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FiMenu, FiX } from "react-icons/fi"

const NavbaarPage = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = ["English", "Spanish", "French"];
  const MotionLink = motion(Link);

  const leftNavItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Service" },
    { path: "/workflow", label: "Work Flow" }
  ];

  const rightNavItems = [
    { path: "/testimonials", label: "Testimonials" },
    { path: "/faq", label: "FAQ" },
    { path: "/booking", label: "Booking" },
    { path: "/contact", label: "Contact" }
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -100 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, delay: 7 }} 
      className="absolute top-0 left-0 right-0 z-[99]"
    >
      <div className="container mx-auto px-4 sm:px-6 ">
        <div className="flex items-center justify-between py-3 sm:py-3 md:py-3 lg:py-0  backdrop-blur-sm  lg:backdrop-blur-none">
          {/* Mobile menu button - visible on small screens */}
          <div className="lg:hidden flex items-center backdrop-blur-sm">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo - centered on mobile */}
          <div className="lg:hidden mx-auto">
            <motion.div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <img src="/Law_logo.png" alt="Logo" />
            </motion.div>
          </div>

          {/* Navigation Links Container with Backdrop Blur */}
          <div className="hidden lg:flex items-center backdrop-blur-sm rounded-full py-4 mx-auto">
            {/* Left Navigation */}
            <div className="flex items-center space-x-6">
              {leftNavItems.map((item) => (
                <MotionLink
                  href={item.path}
                  key={item.path}
                  className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </MotionLink>
              ))}
            </div>

            {/* Logo */}
            <div className="mx-8">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <img src="/Law_logo.png" alt="Logo" />
              </motion.div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6">
              {rightNavItems.map((item) => (
                <MotionLink
                  href={item.path}
                  key={item.path}
                  className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </MotionLink>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu - appears when menu button is clicked */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4  rounded-lg "
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {allNavItems.map((item) => (
                <MotionLink
                  href={item.path}
                  key={item.path}
                  className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md text-base font-medium"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </MotionLink>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="mt-4">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg text-white w-full"
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 bg-black border border-gray-600 rounded-lg overflow-hidden"
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
              </div>
              
              {/* Mobile Sign In Button */}
              <button className="w-full mt-4 px-4 py-2 border border-gray-600 rounded-lg text-white text-center">
                Sign in
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default NavbaarPage;