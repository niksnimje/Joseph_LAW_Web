"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const PageTransition = ({ isTransitioning, children }) => {
  const [scrollDir, setScrollDir] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDir('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDir('up')
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#030408]"
            initial={{ 
              y: scrollDir === 'down' ? '100%' : '-100%',
              opacity: 0.8
            }}
            animate={{ 
              y: scrollDir === 'down' ? '-100%' : '100%',
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}

export default PageTransition