"use client"
import { useState } from "react"
import NavbaarPage from "../../Layout/Header/NavbaarPage"
import Sidebar from "../../Layout/Header/Sidebar"
import Footer from "../../Layout/Footer/Index"
import HomePage from "@/Components/Home/Homepage"


const LawFirmWebsite = () => {
  const [currentSection, setCurrentSection] = useState("home")

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Hide scrollbar globally */}
      <style jsx global>{`
        body {
          overflow: hidden;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
           .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .translateZ-12 {
          transform: translateZ(12px);
        }
        .rotateX-90 {
          transform: rotateX(90deg);
        }
        .rotateY-90 {
          transform: rotateY(90deg);
        }
      `}</style>

      <NavbaarPage />
      <Sidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
      <HomePage currentSection={currentSection} onSectionChange={setCurrentSection} />
      <Footer />
    </div>
  )
}

export default LawFirmWebsite
