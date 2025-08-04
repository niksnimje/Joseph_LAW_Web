"use client"
import AnimatedText from "@/TextEffect/AnimatedText"
import { motion } from "framer-motion"
import { FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { useEffect, useState } from "react"

const MainContact = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative w-full min-h-screen text-white mt-[5%]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/outro.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-20 flex flex-col lg:flex-row justify-center lg:justify-between items-center min-h-screen py-16 px-4 sm:px-8 md:px-12 lg:px-24">
        {/* Left: Branding & Social */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 50 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:max-w-md space-y-6 mb-12 lg:mb-0"
        >
          <AnimatedText
            text="JOSEPH LAW"
            className="text-4xl sm:text-5xl md:text-6xl text-white tracking-wider font-lara text-center lg:text-left"
            delay={1}
          />
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg text-center lg:text-left">
            Joseph Law is a reputable and dynamic law firm dedicated to providing exceptional,
            compassionate legal counsel in all litigation matters.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="#" className="bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition">
              <FaFacebook className="text-lg sm:text-xl" />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition">
              <FaTiktok className="text-lg sm:text-xl" />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition">
              <FaLinkedin className="text-lg sm:text-xl" />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition">
              <RiInstagramFill className="text-lg sm:text-xl" />
            </a>
          </div>
        </motion.div>

        {/* Right: Useful Links */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:w-auto space-y-6"
        >
          <AnimatedText
            text="Useful links"
            className="text-3xl sm:text-4xl text-white tracking-wider font-lara text-center lg:text-left"
            delay={1.2}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {[
              "Real Estate Law",
              "Personal Injury",
              "Business Law",
              "About",
              "Faq",
              "Contact",
              "Assessment",
              "Booking",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="block text-gray-300 hover:text-white transition text-sm sm:text-base text-center lg:text-left"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainContact