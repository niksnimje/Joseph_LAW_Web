"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TestimonialPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const testimonials = [
    {
      id: 1,
      name: "Michael Brown",
      role: "Client",
      rating: "★★★★★",
      content: "Working with Joseph Law was truly a remarkable experience. From the moment I reached out, their team demonstrated a profound level of professionalism and expertise. They guided me through the entire process with clarity and precision.",
      photo: "/testimonialP1.jpg" // Add your image path
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Business Owner",
      rating: "★★★★★",
      content: "The legal team at Joseph Law exceeded all my expectations. They handled my complex case with care and precision, achieving outstanding results that saved my business.",
      photo: "/testimonialP1.jpg" // Add your image path
    },
    {
      id: 3,
      name: "David Wilson",
      role: "Entrepreneur",
      rating: "★★★★☆",
      content: "I was impressed by their attention to detail and clear communication throughout the entire process. Highly recommended for anyone needing top-tier legal services.",
      photo: "/testimonialP1.jpg" // Add your image path
    }
  ];

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
      x: direction > 0 ? 100 : -100,
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
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    })
  };

  return (
    <div className="relative py-16 px-4 md:px-8 lg:px-16 mt-[35%] text-white">
      <div className="absolute -top-50 -left-140 inset-0 bg-black/60  w-screen h-screen -z-1"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 "
        >
          Testimonials
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-gray-300 mb-12"
        >
          Life-changing experiences await. Discover what our customers have to say.
        </motion.p>

        <div className="relative h-[500px] md:h-[400px] w-[700px]">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white backdrop-blur-lg p-8 rounded-lg shadow-lg absolute inset-0 flex flex-col md:flex-row gap-8 items-center border border-white/20 text-black"
            >
              <div className="w-full md:w-1/3 flex justify-center">
                <motion.div 
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20"
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
                <div className="mb-6 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-semibold ">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                  <div className="text-yellow-400 text-xl md:text-2xl mt-2">
                    {testimonials[currentIndex].rating}
                  </div>
                </div>
                
                <p className="text-gray-500 text-lg md:text-xl">
                  {testimonials[currentIndex].content}
                </p>
                  

              </div>
            </motion.div>
          </AnimatePresence>

    
          <button 
            onClick={prevTestimonial}
            className="absolute -left-10 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 p-3 rounded-full shadow-md backdrop-blur-md transition-all text-white border border-white/20"
            whileHover={{ scale: 1.1 }}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute -right-10 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 p-3 rounded-full shadow-md backdrop-blur-md transition-all text-white border border-white/20"
            whileHover={{ scale: 1.1 }}
          >
            <FiChevronRight className="text-2xl" />
          </button>

          
        </div>
        <div className="flex justify-center mt-8 space-x-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentIndex ? 1 : -1);
                          setCurrentIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
      </div>
    </div>
  );
};

export default TestimonialPage;