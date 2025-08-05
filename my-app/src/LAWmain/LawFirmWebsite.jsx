"use client"
import { useState } from "react"
import NavbaarPage from "../../Layout/Header/NavbaarPage"
import Sidebar from "../../Layout/Header/Sidebar"
import Footer from "../../Layout/Footer/Index"
import HomePage from "@/Components/Home/Homepage"
import ShapeContainer from "@/Components/ShapeContainer"


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
      {/* <ShapeContainer> */}
      {/* <NavbaarPage /> */}
      <Sidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
      <HomePage currentSection={currentSection} onSectionChange={setCurrentSection} />
      <Footer />
      {/* </ShapeContainer> */}
    </div>
  )
}
 

export default LawFirmWebsite 
