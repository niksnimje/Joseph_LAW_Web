"use client";
import testimonials from "@/Data/testimonials";
import AnimatedText from "@/TextEffect/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MainTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? (isMobile ? 50 : 100) : (isMobile ? -50 : -100),
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? (isMobile ? -50 : -100) : (isMobile ? 50 : 100),
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    })
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 text-white w-full overflow-hidden mt-[5%] z-50" style={{backgroundImage:"url('/bg-testemonial.webp')"}}>
      <div className="absolute inset-0 bg-black/60 w-full h-full -z-1"></div>
      
      <div className="max-w-6xl mx-auto ">
        <AnimatedText 
          text="Testimonials" 
          className="text-center text-3xl sm:text-4xl text-gray-300 font-light mb-4 z-50" 
          delay={1} 
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-center text-gray-300 mb-8 sm:mb-12 px-4"
        >
          Life-changing experiences await. Discover what our customers have to say.
        </motion.p>

        <div className="relative h-[400px] sm:h-[450px] md:h-[400px] w-full max-w-4xl mx-auto">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-lg shadow-lg absolute inset-0 flex flex-col md:flex-row gap-6 sm:gap-8 items-center border border-white/20 text-white mx-4 sm:mx-0 overflow-hidden"
            >
              <div className="w-full md:w-1/3 flex justify-center">
                <motion.div 
                  className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={testimonials[currentIndex].photo} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="mb-4 sm:mb-6 text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {testimonials[currentIndex].role}
                  </p>
                  <div className="text-yellow-400 text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2">
                    {testimonials[currentIndex].rating}
                  </div>
                </div>
                
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                  {testimonials[currentIndex].content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={prevTestimonial}
            className="absolute left-0 sm:-left-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full shadow-md backdrop-blur-md transition-all text-white border border-white/20"
          >
            <FiChevronLeft className="text-xl sm:text-2xl" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 sm:-right-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full shadow-md backdrop-blur-md transition-all text-white border border-white/20"
          >
            <FiChevronRight className="text-xl sm:text-2xl" />
          </button>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainTestimonial;