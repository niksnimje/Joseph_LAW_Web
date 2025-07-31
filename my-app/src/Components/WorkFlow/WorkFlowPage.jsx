  "use client"
  import { useState, useEffect, useRef } from "react"
  import { motion } from "framer-motion"
  import { gsap } from "gsap"
  import AnimatedText from "@/TextEffect/AnimatedText"
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";
  import Image from "next/image"

  gsap.registerPlugin(MotionPathPlugin);

  const WorkFlowPage = () => {
    const [activeTab, setActiveTab] = useState("Business Law")
    const pathRef = useRef(null)
    const iconsRef = useRef([])
    const pathLengthRef = useRef(0)

    const tabs = ["Business Law", "Litigation", "Real Estate", "Personal Injury"]

    const workflowSteps = {
      "Business Law": [
        {
          id: 1,
          title: "Initial Consultation",
          icon: "/work1.png",
          position: 0.1,
        },
        {
          id: 2,
          title: "Ongoing Legal Support",
          // icon: "⚖️",
          icon: "/work1.png",
          position: 0.3,
        },
        {
          id: 3,
          title: "Regulatory Compliance",
          // icon: "📊",
          icon: "/work1.png",
          position: 0.5,
        },
        {
          id: 4,
          title: "Contract Review",
          // icon: "📄",
          icon: "/work1.png",
          position: 0.7,
        },
        {
          id: 5,
          title: "Entity Formation",
          // icon: "🏢",
          icon: "/work1.png",
          position: 0.9,
        },
      ],
      Litigation: [
        {
          id: 1,
          title: "Case Assessment",
                  icon: "/work1.png",

          position: 0.1,
        },
        {
          id: 2,
          title: "Discovery Phase",
                icon: "/work1.png",

          position: 0.3,
        },
        {
          id: 3,
          title: "Mediation",
              icon: "/work1.png",

          position: 0.5,
        },
        {
          id: 4,
          title: "Trial Preparation",
                icon: "/work1.png",

          position: 0.7,
        },
        {
          id: 5,
          title: "Resolution",
                  icon: "/work1.png",

          position: 0.9,
        },
      ],
      "Real Estate": [
        {
          id: 1,
          title: "Property Analysis",
                icon: "/work1.png",

          position: 0.1,
        },
        {
          id: 2,
          title: "Due Diligence",
                icon: "/work1.png",

          position: 0.3,
        },
        {
          id: 3,
          title: "Contract Negotiation",
                icon: "/work1.png",

          position: 0.5,
        },
        {
          id: 4,
          title: "Title Review",
                icon: "/work1.png",

          position: 0.7,
        },
        {
          id: 5,
          title: "Closing Process",
                icon: "/work1.png",

          position: 0.9,
        },
      ],
      "Personal Injury": [
        {
          id: 1,
          title: "Initial Consultation",
                  icon: "/work1.png",

          position: 0.1,
        },
        {
          id: 2,
          title: "Investigation",
                icon: "/work1.png",

          position: 0.3,
        },
        {
          id: 3,
          title: "Medical Review",
                icon: "/work1.png",

          position: 0.5,
        },
        {
          id: 4,
          title: "Negotiation",
                icon: "/work1.png",

          position: 0.7,
        },
        {
          id: 5,
          title: "Settlement",
                icon: "/work1.png",
          position: 0.9,
        },
      ],
    }

    const currentSteps = workflowSteps[activeTab]

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    pathLengthRef.current = path.getTotalLength();

    gsap.set(path, {
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
      <div className="flex flex-col items-center justify-center px-8 py-16 mt-[25%]">
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
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Workflow Diagram */}
        <div className="relative w-full h-64">
          {/* SVG Path */}
          <svg className=" inset-0 w-full h-full" viewBox="0 0 1445 153" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="50%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M1 0.5C1 0.5 275 153 687.5 153C1100 153 1445.5 0.5 1445.5 0.5"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-lg"
            />
          </svg>

          {/* Workflow Steps */}
          {currentSteps.map((step, index) => {
            return (
              <motion.div
                key={`${activeTab}-${step.id}`}
                ref={(el) => (iconsRef.current[index] = el)}
                className="absolute w-5 h-5 flex items-center justify-center top-18 left-50 "
                initial={{ opacity: 0 }}
              >
                <div className="relative group">
                  {/* Icon Circle */}
                  <div className="w-10 h-10 bg-white border-2 border-gray-600 rounded-full flex items-center justify-center group-hover:border-white transition-all duration-300">
                    <Image src={step.icon} width={100} height={100}  alt="svg"/>
                    {/* <span className="text-xl">{step.icon}</span> */}
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
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center opacity-1 group-hover:opacity-1 transition-opacity duration-300">
                    <h3 className="text-white text-xl font-medium whitespace-nowrap">{step.title}</h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  export default WorkFlowPage
