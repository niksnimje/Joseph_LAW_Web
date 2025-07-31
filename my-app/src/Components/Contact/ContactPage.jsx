"use client"
import AnimatedText from "@/TextEffect/AnimatedText"
import { motion } from "framer-motion"
import { FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const ContactPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white mt-[30%]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
          // className="w-full h-full object-cover"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/outro.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay (for dark effect) */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-20 flex justify-between items-center h-full px-12 md:px-24">
        {/* Left: Branding & Social */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-md space-y-6"
        >
          <AnimatedText
                text="JOSEPH LAW"
                className=" text-white tracking-wider  text-5xl md:text-6xl font-lara "
                delay={1}
              />
          <p className="text-gray-300 leading-relaxed">
            Joseph Law is a reputable and dynamic law firm dedicated to providing exceptional,
            compassionate legal counsel in all litigation matters.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-700 hover:bg-gray-500 rounded p-2 transition">
              <i><FaFacebook /></i>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-500 rounded p-2 transition">
              <i><FaTiktok /></i>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-500 rounded p-2 transition">
              <i><FaLinkedin /></i>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-500 rounded p-2 transition">
              <i><RiInstagramFill /></i>
            </a>
          </div>
        </motion.div>

        {/* Right: Useful Links */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 text-lg"
        >
           <AnimatedText
                text="Useful links"
                className="text-6xl md:text-4xl text-white tracking-wider font-lara"
                delay={1}
              />
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
              className="block text-gray-300 hover:text-white transition"
            >
              {link}
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage
