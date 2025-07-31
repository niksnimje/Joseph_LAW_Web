"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const TrainAnimation = () => {
  const pathRef = useRef(null)
  const boxesRef = useRef([])
  const pathLengthRef = useRef(0)

  // Box data with different colors and positions along the path
  const boxes = [
    { id: 1, color: "bg-red-500", position: 0.1 },
    { id: 2, color: "bg-blue-500", position: 0.3 },
    { id: 3, color: "bg-green-500", position: 0.5 },
    { id: 4, color: "bg-yellow-500", position: 0.7 },
    { id: 5, color: "bg-purple-500", position: 0.9 }
  ]

  useEffect(() => {
  const path = pathRef.current;
  if (!path) return;

  // Get total path length
  pathLengthRef.current = path.getTotalLength();

  // Initial path styles
  gsap.set(path, {
    strokeDasharray: pathLengthRef.current,
    strokeDashoffset: pathLengthRef.current,
  });

  // Reset icons
  iconsRef.current.forEach((icon) => {
    if (icon) {
      gsap.set(icon, { opacity: 0, x: -100, y: -100 });
    }
  });

  const tl = gsap.timeline();

  // Animate the path itself
  tl.to(path, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.inOut",
  });

  // Snake-style animation
  const reversedSteps = [...currentSteps].reverse(); // Last element first (engine)

  reversedSteps.forEach((step, i) => {
    const index = currentSteps.length - 1 - i;
    const icon = iconsRef.current[index];
    if (!icon) return;

    const travelDistance = pathLengthRef.current * step.position;

    const motionObj = { progress: 0 }; // Will animate from 0 to 1

    tl.set(
      icon,
      {
        opacity: 1,
      },
      `+=${i === 0 ? 0.5 : 0.4}` // Delay before each bogie
    );

    tl.to(
      motionObj,
      {
        progress: 1,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          const point = path.getPointAtLength(travelDistance * motionObj.progress);
          gsap.set(icon, {
            x: point.x - 55, // Adjust icon position
            y: point.y - 20,
          });
        },
      },
      `<`
    );
  });
}, [activeTab]);

  return (
    <div className="relative w-full h-64 p-8 bg-gray-900 rounded-xl">
      {/* SVG Path (Railway Track) */}
      <svg className="absolute w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M10,50 Q250,0 490,50"
          stroke="url(#trackGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Boxes (Train Cars) */}
      {boxes.map((box, index) => (
        <div
          key={box.id}
          ref={(el) => (boxesRef.current[index] = el)}
          className={`absolute w-8 h-8 rounded-md ${box.color} shadow-lg flex items-center justify-center text-white font-bold text-xs`}
        >
          {box.id}
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm">
        <p>Train-like animation with last box appearing first</p>
      </div>
    </div>
  )
}

export default TrainAnimation