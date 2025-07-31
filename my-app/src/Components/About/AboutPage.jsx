"use client"
import AnimatedText from "@/TextEffect/AnimatedText"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export default function AboutPage() {
  const [cubeImage, setCubeImage] = useState("/fade111.md") // Default cube image
  const cubeImages = ["/fade12.md", "/fade111.md"] // Array of cube images

  return (
    <div className=" mt-[20%]  px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
        {/* Left Column - Cube Image */}
        <motion.div 
          className="relative w-full h-64 lg:h-[400px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={cubeImage}
            alt="Joseph Law Cube"
            fill
            className="object-contain cursor-pointer transition-all duration-300 hover:scale-105  mix-blend-multiply" 
            onMouseEnter={() => setCubeImage(cubeImages[Math.floor(Math.random() * cubeImages.length)])}
          />
        </motion.div>

        {/* Right Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* <h1 className="text-4xl md:text-5xl font-bold text-[#2a2a2a] mb-8 tracking-tight">
            
          </h1> */}
          <AnimatedText text="About Us" className="text-6xl  text-white mb-8" />
          
          <div className="space-y-6 text-[#6A6A6A] leading-relaxed">
            <p>
              Joseph Law is a reputable and dynamic law firm dedicated to providing exceptional, compassionate legal counsel in all litigation matters.
            </p>
            <p>
              With a commitment to character, wisdom, and honesty, we have established ourselves as a trusted partner in the legal community. Our client-centric solutions and proactive communication ensure that clients receive the highest level of legal representation and personalized attention throughout their legal journey.
            </p>
            <p>
              Our mission is to effectively represent your interests and help maximize the full legal value of your claim. We work alongside our clients to help them navigate the process from start to finish, while providing honest representation every step of the way.
            </p>
          </div>

          <motion.button
            className="mt-10 px-8 py-3 bg-[#2a2a2a] text-white rounded-lg flex items-center gap-2 hover:bg-[#3a3a3a] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read more
            <motion.span 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}