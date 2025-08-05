"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedText from "@/TextEffect/AnimatedText"
import services from "@/Data/services"

const ServicePage = () => {
  const [activeTab, setActiveTab] = useState("Business")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredServices = services.filter((service) => service.category === activeTab)

  const handleDrag = (event, info) => {
    const threshold = isMobile ? 50 : 100
    if (info.offset.x > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (info.offset.x < -threshold && currentSlide < filteredServices.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    
    <div className="relative flex items-center justify-center px-4 md:px-8 w-full min-h-screen overflow-hidden mt-[5%]">
      {/* Background Image with proper sizing */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/service_bg.webp')",
          backgroundSize: isMobile ? 'cover' : 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      {/* Main Content Container */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 z-10">
        {/* Header */}
        <div className="text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <AnimatedText 
              text="Our Services" 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-2 md:mb-4" 
              delay={0.3} 
            />
            <motion.p
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Discover our wide range of professional services.
            </motion.p>
          </motion.div>

          {/* 3D Service Cubes - Slider */}
          <div className="mt-8 md:mt-16 w-full  ">
            <motion.div
              ref={sliderRef}
              className="flex space-x-4 md:space-x-12 w-max px-4 md:px-[calc(50%-10rem)]"
              drag="x"
              dragConstraints={{ 
                left: -(filteredServices.length - 1) * (isMobile ? 250 : 300), 
                right: 0 
              }}
              onDragEnd={handleDrag}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="relative group cursor-grab active:cursor-grabbing w-[16rem] sm:w-[18rem] md:w-[20rem] shrink-0"
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  initial={{ opacity: 0, rotateY: -30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: 1.8 + index * 0.2 }}
                >
                  {/* Arrow Icon - Hidden on mobile */}
                  {!isMobile && (
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 border border-gray-600 rounded flex items-center justify-center group-hover:border-white transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </motion.div>
                  )}

                  {/* 3D Cube */}
                  <div className="relative w-full h-40 sm:h-48 md:h-55">
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ 
                        scale: isMobile ? 1.1 : 1.3, 
                        rotateY: isMobile ? 0 : 15, 
                        rotateX: isMobile ? 0 : 5 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Front Face */}
                      <div className="absolute inset-0 rounded-lg overflow-hidden transform">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="w-full h-full object-cover opacity-80"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg?height=200&width=300&text=" + service.title
                          }}
                        />
                        <div className="absolute inset-0" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Service Title */}
                  <motion.h3
                    className="text-white text-lg sm:text-xl font-light mt-4 sm:mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 + index * 0.1 }}
                  >
                    {service.title}
                  </motion.h3>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <motion.div
            className="flex items-center justify-center space-x-0 bg-gray-800/50 rounded-lg p-1 w-fit sm:w-fit mx-auto mt-6 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            {["Business", "Individual"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setCurrentSlide(0)
                }}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServicePage