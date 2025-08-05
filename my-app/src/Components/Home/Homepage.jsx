"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import AnimatedText from "@/TextEffect/AnimatedText"
import PageTransition from "../Transiction/PageTransition"
import WorkFlow from "../WorkFlow/Index"
import Contact from "../Contact/Index"
import Faq from "../FAQ/Index"
import Testimonials from "../Testimonials/Index"
import AboutPage from "../About/AboutPage";
import ServicePage from "../Service/ServicePage";
import ExploreButton from "@/CVA/ExploreButton";

const sectionComponents = {
  home: ({ initialDelay }) => (
    <div className="conatiner mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8 flex flex-col text-left 
                   fixed bottom-60 left-2/3 transform -translate-x-1/2 
                   w-[90vw] max-w-md
                   sm:absolute sm:left-[35%] sm:bottom-[30%] sm:translate-x-0 
                   sm:w-auto sm:max-w-none
                   md:absolute md:left-[35%] md:bottom-[30%] md:translate-x-0 
                   md:w-auto md:max-w-none
                   lg:absolute lg:left-[30%] lg:bottom-[20%] lg:translate-x-0 
                   lg:w-auto lg:max-w-none
                   xl:absolute xl:left-[35%] xl:bottom-[15%] xl:translate-x-0 
                   xl:w-auto xl:max-w-none
                   2xl:absolute 2xl:left-[35%] 2xl:bottom-[30%] 2xl:translate-x-0 
                   2xl:w-auto 2xl:max-w-none
                   px-4 sm:px-0 z-10"
      >
        <AnimatedText
          text="Joseph Law"
          className="text-xl sm:text-2xl text-gray-300 font-light text-left"
          delay={initialDelay}
        />
        <AnimatedText
          text="FOR THE TIMES"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-[400] text-white font-lara leading-tight sm:leading-[1.1]"
          delay={initialDelay}
        />
      </motion.div>
      <motion.div className="text-center sm:text-left absolute left-[57%] bottom-[30%] sm:bottom-[25%] md:bottom-[25%] lg:bottom-[18%] xl:bottom-[12%] 2xl:bottom-[25%]  transform -translate-x-1/2 sm:translate-x-0 px-4 sm:px-0" delay={7}>
        <ExploreButton text="explore" delay={initialDelay}/>
      </motion.div>
    </div>
  ),
  services: ServicePage,
  about: AboutPage,
  workflow: WorkFlow,
  faq: Faq,
  testimonials: Testimonials,
  contact: Contact
}

const HomePage = ({ currentSection, onSectionChange }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const videoRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [previousSection, setPreviousSection] = useState("home")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [initialDelay, setInitialDelay] = useState(7)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [lastScrollTime, setLastScrollTime] = useState(0)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelay(1)
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  // Original PC scroll handler (unchanged)
  useEffect(() => {
    const handleWheel = (e) => {
      if (isMobile) return
      
      e.preventDefault()
      const delta = e.deltaY
      const maxScroll = 2400
      const newScrollY = Math.max(0, Math.min(scrollY + delta * 0.5, maxScroll))
      setScrollY(newScrollY)

      let newSection = "home"
      if (newScrollY < 400) {
        newSection = "home"
      } else if (newScrollY < 800) {
        newSection = "services"
      } else if (newScrollY < 1200) {
        newSection = "about"
      } else if (newScrollY < 1600) {
        newSection = "workflow"
      } else if (newScrollY < 2000) {
        newSection = "faq"
      } else if (newScrollY < 2300) {
        newSection = "testimonials"
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

    // Mobile touch handlers
    const handleTouchStart = (e) => {
      if (!isMobile) return
      setTouchStart(e.changedTouches[0].screenY)
    }

    const handleTouchEnd = (e) => {
      if (!isMobile) return
      
      const touchEnd = e.changedTouches[0].screenY
      const now = Date.now()
      if (now - lastScrollTime < 500) return
      setLastScrollTime(now)

      const diff = touchStart - touchEnd
      if (Math.abs(diff) < 50) return

      const direction = diff > 0 ? 'down' : 'up'
      const sections = ["home", "services", "about", "workflow", "faq", "testimonials", "contact"]
      const currentIndex = sections.indexOf(currentSection)

      let newSection = currentSection
      if (direction === 'down' && currentIndex < sections.length - 1) {
        newSection = sections[currentIndex + 1]
      } else if (direction === 'up' && currentIndex > 0) {
        newSection = sections[currentIndex - 1]
      }

      if (newSection !== currentSection) {
        setIsTransitioning(true)
        setPreviousSection(currentSection)
        
        setTimeout(() => {
          onSectionChange(newSection)
          setTimeout(() => {
            setIsTransitioning(false)
            window.scrollTo(0, 0)
          }, 300)
        }, 250)
      }
    }

    const container = containerRef.current
    if (container) {
      if (isMobile) {
        container.addEventListener('touchstart', handleTouchStart)
        container.addEventListener('touchend', handleTouchEnd)
      } else {
        container.addEventListener('wheel', handleWheel, { passive: false })
      }

      return () => {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [scrollY, onSectionChange, currentSection, isMobile, touchStart, lastScrollTime])

  // Original GSAP animation for PC (unchanged)
  useEffect(() => {
    if (contentRef.current && !isMobile) {
      gsap.to(contentRef.current, {
        y: -scrollY * 0.3,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [scrollY, isMobile])

  // Video handling (unchanged)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let looping = false

    if (currentSection === "home") {
      video.play()

      const handleEnded = () => {
        looping = true
        video.currentTime = video.duration - 3
        video.play()
      }

      const handleTimeUpdate = () => {
        if (looping && video.currentTime >= video.duration) {
          video.currentTime = video.duration - 3
          video.play()
        }
      }

      video.addEventListener("ended", handleEnded)
      video.addEventListener("timeupdate", handleTimeUpdate)

      return () => {
        video.removeEventListener("ended", handleEnded)
        video.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [currentSection])

  const renderContent = () => {
    const Component = sectionComponents[currentSection]
    return currentSection === 'home' ? 
      <Component initialDelay={initialDelay} /> : 
      <Component />
  }

  return (
    <PageTransition isTransitioning={isTransitioning}>
      {/* PC version (unchanged) */}
      {!isMobile && (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden">
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
                      : currentSection === "workflow"
                      ? "url('/bg_process.avif')"
                      : currentSection === "faq"
                      ? "url('/bg-faq.webp')"
                      : currentSection === "testimonials"
                      ? "url('/bg-testemonial.webp')"
                      : "none",
                }}
              />
            )}
          </div>

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

          <div
            ref={contentRef}
            className="relative z-10 min-h-screen flex items-center justify-center px-8 w-full"
            style={{ clipPath: "url(#customShape)" }}
          >
            {renderContent()}
          </div>
        </div>
      )}

      {/* Mobile version */}
      {isMobile && (
        <div 
          ref={containerRef} 
          className="relative min-h-screen overflow-auto"
          style={{
            height: '100vh',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div 
            className="absolute inset-0 z-0"
            style={{
              height: '100vh',
              position: 'fixed'
            }}
          >
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
                      : currentSection === "workflow"
                      ? "url('/bg_process.avif')"
                      : currentSection === "faq"
                      ? "url('/bg-faq.webp')"
                      : currentSection === "testimonials"
                      ? "url('/bg-testemonial.webp')"
                      : "none",
                  height: '100vh'
                }}
              />
            )}
          </div>

          <div
            className="relative z-10 min-h-screen flex items-center justify-center px-8 w-full"
            style={{ 
              height: '100vh',
              paddingTop: '60px',
              paddingBottom: '60px'
            }}
          >
            {renderContent()}
          </div>
        </div>
      )}
    </PageTransition>
  )
}

export default HomePage