"use client"
import { motion } from "framer-motion"
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoTiktok } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const FooterPage = () => {
  const socialIcons = [
    { name: "Facebook", icon: <IoLogoFacebook /> },
    { name: "Twitter", icon: <IoLogoTiktok /> },
    { name: "Instagram", icon: <AiFillInstagram /> },
    { name: "LinkedIn", icon: <FaLinkedin/> },
  ]

  return (
    <motion.footer initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{ duration: 1,delay:7 }} className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-t border-gray-800 font-lara">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Copyright */}
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className="text-gray-400 text-xs">
              Copyright © 2025 Joseph law. All rights reserved. Design and develop by{" "}
              <span className="text-white">MILAN Webionics Inc.</span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {socialIcons.map((social) => (
              <motion.a
                key={social.name}
                href="#"
                className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default FooterPage
