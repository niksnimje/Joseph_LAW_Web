  "use client"
  import { useEffect, useRef } from "react"
  import { gsap } from "gsap"

  const AnimatedText = ({ text, className = "", delay = 0 }) => {
    const textRef = useRef(null)

    useEffect(() => {
      if (textRef.current) {
        const letters = textRef.current.querySelectorAll(".letter")

        gsap.set(letters, {
          opacity: 0,
          x: 50,
          rotationY: 90,
        })

        gsap.to(letters, {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.05,
          delay: delay,
          ease: "back.out(1.7)",
        })
      }
    }, [delay])

    const splitText = text.split("").map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ))

    return (
      <div ref={textRef} className={className}>
        {splitText}
      </div>
    )
  }

  export default AnimatedText
