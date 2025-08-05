"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import AnimatedText from "@/TextEffect/AnimatedText"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image"
import workflowSteps from "@/Data/workflowSteps"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(MotionPathPlugin);

const WorkFlowPage = () => {
  const [activeTab, setActiveTab] = useState("Business Law")
  const pathRef = useRef(null)
  const iconsRef = useRef([])
  const pathLengthRef = useRef(0)
  const isMobile = useMediaQuery({ query: '(max-width: 1280px)' })

  const tabs = ["Business Law", "Litigation", "Real Estate", "Personal Injury"]
  const currentSteps = workflowSteps[activeTab]

  useEffect(() => {
    if (isMobile) return; // Skip GSAP animation for mobile

    const path = pathRef.current;
    if (!path) return;

    pathLengthRef.current = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLengthRef.current,
      strokeDashoffset: pathLengthRef.current,
    });

    const startX = -320;
    const startY = -100;

    iconsRef.current.forEach((icon) => {
      if (icon) {
        gsap.set(icon, { opacity: 0, x: startX, y: startY });
      }
    });

    const tl = gsap.timeline();

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 5,
      ease: "power2.inOut",
    }, 0);

    const totalSteps = currentSteps.length;
    const spacing = 1 / totalSteps;

    currentSteps.forEach((step, i) => {
      const icon = iconsRef.current[i];
      if (icon) {
        tl.set(icon, {
          opacity: step.opacity ?? 0.3,
          x: startX,
          y: startY,
        }, 0.3 + i * 0.05);
      }
    });

    const trainProgress = { value: 0 };

    tl.to(trainProgress, {
      value: 1,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        currentSteps.forEach((step, i) => {
          const icon = iconsRef.current[i];
          if (!icon) return;

          const progressOffset = i * spacing;
          const effectiveProgress = Math.max(0, trainProgress.value - (1 - progressOffset));

          if (effectiveProgress >= 0) {
            const lengthOnPath = pathLengthRef.current * step.position * trainProgress.value;
            const point = path.getPointAtLength(lengthOnPath);

            if (trainProgress.value < 0.1) {
              const progressToPathStart = trainProgress.value / 0.1;
              const currentX = startX + (point.x - startX) * progressToPathStart;
              const currentY = startY + (point.y - startY) * progressToPathStart;
              
              gsap.set(icon, {
                x: currentX - 20,
                y: currentY - 20,
                opacity: step.opacity ?? 1,
              });
            } else {
              gsap.set(icon, {
                x: point.x - 25,
                y: point.y - 28,
                opacity: step.opacity ?? 1,
              });
            }
          }
        });
      }
    }, 0.5);
  }, [activeTab, isMobile]);

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      {/* <div className="max-w-8xl " > </div> */}
    <div className="flex flex-col items-center justify-center md:py-16 mt-[60%] md:mt-[10%] lg:mt-[25%]  px-4 md:px-8 lg:px-0 py-16 ">
      {/* Header */}
      <div className="text-center max-w-8xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <AnimatedText text="Our Workflow" className="text-4xl md:text-7xl font-light text-white mb-6" delay={0.3} />
          <motion.p
            className="text-gray-400 text-sm md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            At Joseph Law, our workflow is meticulously crafted to ensure seamless and efficient handling of your legal
            matters.
          </motion.p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 md:mb-16 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Workflow Diagram */}
      {isMobile ? (
        <div className="w-full max-w-md mx-auto space-y-8 xl:hidden">
          {currentSteps.map((step, index) => (
            <div key={`${activeTab}-${step.id}`} className="relative flex flex-col items-center">
              {/* SVG line behind each item */}
              {/* <svg 
                className="absolute w-full h-full top-0 left-0 -z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path 
                  d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5 " 
                  stroke="white" 
                  strokeOpacity="0.2" 
                  strokeWidth="1"
                />
              </svg> */}
                 <svg class="w-full absolute top-20 scale-y-110" viewBox="0 0 1446 154" fill="none" preserve-aspect-ratio="none"><path d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5" stroke="white" stroke-opacity="1"></path></svg>
              
              <div className="relative group flex flex-col items-center">
                {/* Icon Circle */}
                <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center group-hover:border-white transition-all duration-300 bg-gray-800">
                  <Image
                    src={step.icon}
                    width={80}
                    height={80}
                    alt={step.title}
                    style={{ opacity: step.opacity ?? 1 }}
                  />
                </div>

                {/* Step Title */}
                <div className="mt-4 text-center transition-opacity duration-300">
                  <h3 className="text-[#DADADA] text-base font-medium whitespace-nowrap" style={{ opacity: step.opacity ?? 1 }}>
                    {step.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-64 hidden md:block">
          {/* SVG Path */}
          <svg className="w-full absolute top-20 scale-y-110" viewBox="0 0 1446 154" fill="none" preserveAspectRatio="none">
            <path d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5" stroke="white" strokeOpacity="0.2"></path>
          </svg>
          <svg className="w-full absolute top-30 scale-y-110" viewBox="0 0 1446 154" fill="none" preserveAspectRatio="none">
            <path d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5" stroke="white" strokeOpacity="0.1"></path>
          </svg>
          <svg className="w-full absolute top-0 scale-y-110" viewBox="0 0 1446 154" fill="none" preserveAspectRatio="none">
            <path d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5" stroke="white" strokeOpacity="0.4"></path>
          </svg>
          
          <svg className="inset-0 w-full h-full" viewBox="0 0 1445 153" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="50%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 1 0.5 C 1 0.5 275 153 693 139 C 1091 134 1148 67 1445.5 0.5"
              stroke="url(#pathGradient)"
              strokeWidth="0"
              fill="none"
              className="drop-shadow-lg"
            />
          </svg>
          
          {/* Workflow Steps */}
          {currentSteps.map((step, index) => (
            <motion.div
              key={`${activeTab}-${step.id}`}
              ref={(el) => (iconsRef.current[index] = el)}
              className="absolute w-5 h-5 flex items-center justify-center top-18 left-50 lg:-left-10 xl:-left-10 2xl:left-50"
              initial={{ opacity: 0, x: 0 }}
            >
              <div className="relative group w-[40px]">
                <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center group-hover:border-white transition-all duration-300">
                  <Image
                    src={step.icon}
                    width={110}
                    height={100}
                    alt="svg"
                    style={{ opacity: step.opacity ?? 1 }}
                  />
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-300">
                  <h3 className="text-[#DADADA] text-base font-medium whitespace-nowrap" style={{ opacity: step.opacity ?? 1 }}>
                    {step.title}
                  </h3>
                </div>
              </div>  
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </>
     
  )
}

export default WorkFlowPage