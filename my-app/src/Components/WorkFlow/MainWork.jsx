  "use client"
  import { useState, useEffect, useRef } from "react"
  import { motion } from "framer-motion"
  import { gsap } from "gsap"
  import AnimatedText from "@/TextEffect/AnimatedText"
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";
  import Image from "next/image"
import workflowSteps from "@/Data/workflowSteps"

  gsap.registerPlugin(MotionPathPlugin);

  const MainWork = () => {
    const [activeTab, setActiveTab] = useState("Business Law")
    const pathRef = useRef(null)
    const pathRef2 = useRef(null)
    const [isMobile, setIsMobile] = useState(false)
    const iconsRef = useRef([])
    const pathLengthRef = useRef(0)

    const tabs = ["Business Law", "Litigation", "Real Estate", "Personal Injury"]




  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1300  )
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

    const currentSteps = workflowSteps[activeTab]

  useEffect(() => {
    const path = pathRef.current;
    const path2 = pathRef2.current;
    if (!path) return;

    pathLengthRef.current = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLengthRef.current,
      strokeDashoffset: pathLengthRef.current,
    });
    gsap.set(path2, {
      strokeDasharray: pathLengthRef.current,
      strokeDashoffset: pathLengthRef.current,
    });


    iconsRef.current.forEach((icon) => {
      if (icon) {
        gsap.set(icon, { opacity: 0, x: -100, y: -100 });
      }
    });

    const tl = gsap.timeline();

    // Draw path with slight overlap
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
    }, 0); // starts immediately
     tl.to(path2, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
    }, 0); // starts immediately

    const totalSteps = currentSteps.length;
    const spacing = 1 / totalSteps;
    const startPoint = path.getPointAtLength(0);

    // Set all icons initially at start point
    currentSteps.forEach((step, i) => {
      const icon = iconsRef.current[i];
      if (icon) {
        tl.set(icon, {
          opacity: 1,
          x: startPoint.x - 500,
          y: startPoint.y - 20,
        }, 0.3 + i * 0.05); // fast stagger for appearance
      }
    });

    const trainProgress = { value: 0 };

    // Train motion starts almost immediately after path draw
    tl.to(trainProgress, {
      value: 1,
      duration: 2.5,
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

            gsap.set(icon, {
              x: point.x - 20,
              y: point.y - 20,
            });
          }
        });
      }
    }, 0.5); // overlaps with path drawing

  }, [activeTab]);


    const handleTabChange = (tab) => {
      setActiveTab(tab)
    }

    return (
      <div className="flex flex-col items-center justify-center px-8 py-16 mt-[5%]" style={{backgroundImage:"url('/bg_process.avif')"}}>
        {/* Header */}
        <div className="text-center max-w-8xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <AnimatedText text="Our Workflow" className="text-6xl md:text-7xl font-light text-white mb-6" delay={0.3} />
            <motion.p
              className="text-gray-400 text-lg leading-relaxed"
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
          className="flex flex-wrap items-center justify-center gap-4 mb-16 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white text- black"
                  : "text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Workflow Diagram */}
        <div className="relative w-full h-50 ">
          {/* SVG Path */}
          <svg className=" inset-0 w-full h-full" viewBox="0 0 1445 160" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="55%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5"
              
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-lg"
            />
          </svg>
           <svg className=" inset-0 w-full h-full" viewBox="0 0 1445 160" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="55%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef2}
              d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5"
              
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-lg"
            />
          </svg>

          {/* Workflow Steps */}
{currentSteps.map((step, index) => {
  return isMobile ? (
    // Mobile - Static Layout
    <div 
      key={`${activeTab}-${step.id}-mobile`}
      className="absolute flex flex-col items-center"
      style={{
        left: `${(index + 0.5) * (100 / currentSteps.length)}%`,
        top: '90%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Icon Circle */}
      <div className="w-8 h-8 bg-white border-2 border-gray-600 rounded-full flex items-center justify-center mb-2">
        <Image 
          src={step.icon} 
          width={16} 
          height={16}  
          alt={step.title}
        />
      </div>
      
      {/* Step Title - Always visible on mobile */}
      <h3 className="text-white text-xs sm:text-sm font-medium text-center">
        {step.title}
      </h3>
    </div>
  ) : (
    // Desktop - Animated Version
    <motion.div
      key={`${activeTab}-${step.id}`}
      ref={(el) => (iconsRef.current[index] = el)}
      className="absolute top-25 left-40
       w-20 h-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
    >
      <div className="relative group">
        {/* Icon Circle */}
        <div className="w-10 h-10 bg-white border-2 border-gray-600 rounded-full flex items-center justify-center group-hover:border-white transition-all duration-300">
          <Image src={step.icon} width={20} height={20} alt={step.title} />
        </div>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-white rounded-full opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.5,
          }}
        />
        
        {/* Step Title */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">
            {step.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
})}
        </div>
      </div>
    )
  }

  export default MainWork
