"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import AnimatedText from "@/TextEffect/AnimatedText"
import Service from "../Service/Index"
import PageTransition from "../Transiction/PageTransition"
import About from "../About/Index"


const HomePage = ({ currentSection, onSectionChange }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const videoRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [previousSection, setPreviousSection] = useState("home")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [initialDelay, setInitialDelay] = useState(7)


  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelay(1) // after first render delay, reduce for next
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY
      const newScrollY = Math.max(0, Math.min(scrollY + delta * 0.5, 1000))
      setScrollY(newScrollY)

      // Change sections based on scroll
     let newSection = "home"
      if (newScrollY < 250) {
        newSection = "home"
      } else if (newScrollY < 500) {
        newSection = "services"
      } else if (newScrollY < 750) {
        newSection = "about"
      } else {
        newSection = "contact"
      }

     if (newSection !== currentSection) {
        setIsTransitioning(true)
        setPreviousSection(currentSection)

        setTimeout(() => {
          onSectionChange(newSection)
          setTimeout(() => {
            setIsTransitioning(false)
          }, 300)
        }, 250)
      }
      
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [scrollY, onSectionChange,currentSection])

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: -scrollY * 0.3,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [scrollY])

  // video useefect

   useEffect(() => {
    const video = videoRef.current;

    if (currentSection === "home" && video) {
      video.play();

      const handleEnd = () => {
        video.pause();
        video.currentTime = video.duration; // last frame pe stop
      };

      video.addEventListener("ended", handleEnd);

      return () => {
        video.removeEventListener("ended", handleEnd);
      };
    }
  }, [currentSection]);

  const renderContent = () => {
    switch (currentSection) {
      case "home":
        return (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <AnimatedText text="Joseph Law" className="text-left text-2xl text-gray-300 font-light mb-4" delay={initialDelay} />
              <AnimatedText
                text="FOR THE TIMES"
                className="text-6xl md:text-8xl font-bold text-white tracking-wider"
                delay={initialDelay}
              />
            </motion.div>

            <motion.button
              className="group relative px-8 py-3 border border-gray-400 rounded-lg text-white overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 7 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 ,delay:7 }}
              />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">explore →</span>
            </motion.button>
          </div>
        )

        case "services":
        return <Service />
        
        case "about":

          return <About />

      

      case "contact":
        return (
          <div className="text-center">
            <AnimatedText text="Contact Us" className="text-6xl font-bold text-white mb-8" />
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Get in touch with our experienced legal team for professional consultation.
            </motion.p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageTransition isTransitioning={isTransitioning}>
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    //   style={{
    //     background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
    //   }}
    >
      {/* Custom Shape Container */}
     <div className="absolute inset-0 z-0">
      {currentSection === "home" ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
        >
          <source src="/video/intro.webm" type="video/webm" />
        </video>
      ) : (
        <div
          className="w-full h-full object-cover bg-cover bg-center"
          style={{
            backgroundImage:
              currentSection === "services"
                ? "url('/service_bg.webp')"
                : currentSection === "about"
                ? "url('/about_bg.webp')"
                : currentSection === "contact"
                ? "url('/bg-contact.webp')"
                : "none",
          }}
        />
      )}
    </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(1000px) rotateX(60deg)",
            transformOrigin: "center bottom",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-8"
        style={{ clipPath: "url(#customShape)" }}
      >
        {renderContent()}
      </div>

      {/* Decorative Elements */}
    
    </div>
    </PageTransition>
  )
}

export default HomePage
