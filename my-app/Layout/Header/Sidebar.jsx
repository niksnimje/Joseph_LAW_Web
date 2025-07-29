"use client"
import { motion } from "framer-motion"

const Sidebar = ({ currentSection, onSectionChange }) => {
  const sections = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.div initial={{opacity:0,x:-100}} animate={{opacity:1,x:0}} transition={{ duration: 1,delay:7 }}  className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40" >
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative group cursor-pointer"
            onClick={() => onSectionChange(section.id)}
            whileHover={{ scale: 1.1 }}
          >
            {/* Arrow */}
            <div
              className={`w-8 h-0.5 transition-all duration-300 ${
                currentSection === section.id ? "bg-white" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-t-2 border-b-2 border-transparent transition-all duration-300 ${
                  currentSection === section.id ? "border-l-white" : "border-l-gray-600"
                }`}
              />
            </div>

            {/* Label */}
            <motion.span
              className={`absolute left-12 top-1/2 transform -translate-y-1/2 text-xs whitespace-nowrap transition-all duration-300 ${
                currentSection === section.id ? "text-white opacity-100" : "text-gray-600 opacity-0"
              }`}
              animate={{
                opacity: currentSection === section.id ? 1 : 0,
                x: currentSection === section.id ? 0 : -10,
              }}
            >
              {section.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Sidebar
