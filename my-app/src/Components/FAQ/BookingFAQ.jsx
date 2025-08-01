// components/BookingFAQ.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import Image from "next/image";
import AnimatedText from "@/TextEffect/AnimatedText";

const BookingFAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentImage, setCurrentImage] = useState("/timer.png");
  const faqImages = ["/timerr.md", "/timerr2.md"];

  const faqs = [
    {
      question: "What is damage law?",
      answer: "Damage law refers to the legal principles that govern compensation for losses or injuries caused to a person or their property."
    },
    {
      question: "Can I negotiate with insurance companies on my own for property damage claims?",
      answer: "While you can negotiate with insurance companies on your own, it's often beneficial to seek assistance from a property damage attorney."
    },
    {
      question: "What should I do if my property damage claim is denied?",
      answer: "If your claim is denied, you should review the denial letter carefully and consider consulting with a property damage attorney."
    },
    {
      question: "How can I find the right property damage attorney for my case?",
      answer: "Look for attorneys with experience in property damage claims and check their reviews and track record."
    },
    {
      question: "What is the difference between compensatory and punitive damages?",
      answer: "Compensatory damages compensate for actual losses, while punitive damages punish the wrongdoer."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const changeImage = () => {
    const randomIndex = Math.floor(Math.random() * faqImages.length);
    setCurrentImage(faqImages[randomIndex]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-[30%] ">
         {/* Overlay (for dark effect) */}
      <div className="absolute inset-0 bg-black/2 bg-opacity-10 z-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">

        {/* Left Side - Image with Hover Effect */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-64 md:h-full rounded-lg overflow-hidden"
        >
          <div className="relative flex items-center justify-between mb-6">
            <AnimatedText text="Online Booking" className="text-left text-5xl text-gray-300 font-light mb-4" delay={1} />

          </div>
          <p className="text-white mb-6">
            Conveniently schedule your appointment with us in just a few clicks! Our online booking system makes it effortless for you to choose the date and time that works best for you.
          </p>
          <Image
            src={currentImage}
            alt="FAQ Visual"
            fill
            className="object-contain cursor-pointer w-75 mt-[12%] z-10 "
            onMouseEnter={changeImage}
          />

        </motion.div>

        {/* Right Side - FAQ */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" rounded-lg shadow-lg p-8"
        >
           <AnimatedText text="FAQ" className="text-left text-5xl text-gray-300 font-light mb-4" delay={1} />
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${activeFaq === index ? 'bg-white shadow-md' : 'text-white'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between p-4 text-left ${activeFaq === index ? 'font-semibold' : 'font-medium'}`}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeFaq === index ? <FiArrowUp /> : <FiArrowDown />}
                  </motion.div>
                </button>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          
        </motion.div>
      </div>
    </div>
  );
};

export default BookingFAQ;  