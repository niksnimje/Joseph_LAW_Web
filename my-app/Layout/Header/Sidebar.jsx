"use client"
import { motion } from "framer-motion"

const sectionData = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "workflow", label: "Work" },
  { id: "faq", label: "FAQ" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
]

const Sidebar = ({ currentSection, onSectionChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1, delay: 7 }}  
      className="fixed left-2 lg:left-12 top-1/2 transform -translate-y-1/2 z-40"
      style={{
        marginTop: 'env(safe-area-inset-top, 0)'
      }}
    >
      <div className="flex flex-col space-y-4">
        {sectionData.map((section) => (
          <motion.div
            key={section.id}
            className="relative group cursor-pointer"
            onClick={() => {
              onSectionChange(section.id);
              // Scroll to top when changing section on mobile
              if (window.innerWidth < 768) {
                window.scrollTo(0, 0);
              }
            }}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`w-0.5 h-5 transition-all duration-300 ${
                currentSection === section.id ? "bg-white" : "bg-gray-600"
              }`}
            />
            <motion.span
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xs whitespace-nowrap transition-all duration-300 ${
                currentSection === section.id ? "text-white" : "text-gray-600 hover:text-white"
              }`}
              animate={{
                opacity: currentSection === section.id ? 1 : 0,
                x: currentSection === section.id ? 0 : -10,
              }}
              transition={{ duration: 1 }}
              whileHover={{
                opacity: currentSection === section.id ? 0 : 1
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