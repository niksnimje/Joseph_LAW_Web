"use client"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import AnimatedText from "@/TextEffect/AnimatedText"


const ServicePage = () => {
  const [activeTab, setActiveTab] = useState("Business")
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)

  const services = [
    {
      id: 1,
      title: "Litigation",
      image: "/3dimage1.webp",
      category: "Business",
    },
    {
      id: 2,
      title: "Real Estate",
      image: "/3dimage2.webp",
      category: "Business",
    },
    {
      id: 3,
      title: "Business Law",
      image: "/3dimage3.webp",
      category: "Business",
    },
    {
      id: 4,
      title: "Immigration",
      image: "/3dimage4.webp",
      category: "Business",
    },
    {
      id: 1,
      title: "Litigation",
      image: "/3dimage1.webp",
      category: "Individual",
    },
    {
      id: 2,
      title: "Real Estate",
      image: "/3dimage2.webp",
      category: "Individual",
    },
    {
      id: 3,
      title: "Business Law",
      image: "/3dimage3.webp",
      category: "Individual",
    },
    {
      id: 4,
      title: "Immigration",
      image: "/3dimage4.webp",
      category: "Individual",
    },
  ]

  const filteredServices = services.filter((service) => service.category === activeTab)

  const handleDrag = (event, info) => {
    const threshold = 100
    if (info.offset.x > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (info.offset.x < -threshold && currentSlide < filteredServices.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    <div className="relative mt-[200px] flex items-center justify-center px-8 ">
       {/* Overlay */}
      <div className="absolute -top-50 -left-100 inset-0 bg-black/70 z-0 w-screen h-screen "></div>
      {/* Header */}
      <div className="text-center z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <AnimatedText text="Our Services" className="text-6xl md:text-7xl font-light text-white mb-4" delay={0.3} />
          <motion.p
            className="text-gray-400 text-lg "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Discover our wide range of professional services.
          </motion.p>
        </motion.div>

        {/* 3D Service Cubes */}
        <div className="mt-16  w-full">
          <motion.div
            ref={sliderRef}
            className="flex space-x-12 w-max px-[calc(50%-10rem)]"
            drag="x"
            dragConstraints={{ left: -(filteredServices.length - 1) * 300, right: 0 }}
            onDragEnd={handleDrag}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group cursor-grab active:cursor-grabbing w-[20rem] shrink-0"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, rotateY: -30 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: 1.8 + index * 0.2 }}
              >
                {/* Arrow Icon */}
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

                {/* 3D Cube */}
                <div className="relative w-75 h-55 ">
                  <motion.div
                    className="relative w-full h-full "
                    whileHover={{ scale:1.3, rotateY: 15, rotateX: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Front Face */}
                    <div className="absolute inset-0  rounded-lg overflow-hidden transform translateZ-12">
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

                    {/* Top Face */}
                    <div className="absolute inset-0 bg-gray-700 border border-gray-600 rounded-lg transform rotateX-90 translateZ-12 origin-top" />

                    {/* Right Face */}
                    <div className="absolute inset-0 bg-gray-900 border border-gray-600 rounded-lg transform rotateY-90 translateZ-12 origin-right" />
                  </motion.div>
                </div>

                {/* Service Title */}
                <motion.h3
                  className="text-white text-xl font-light mt-6 text-center"
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
          className="flex items-center justify-center space-x-0 bg-gray-800/50 rounded-lg p-1 w-fit mx-auto mt-10"
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
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

      </div>
    </div>
  )
}

export default ServicePage
