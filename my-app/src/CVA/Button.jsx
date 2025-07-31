// components/Button.jsx
"use client";

import { useRef, useEffect } from 'react';

const Button = ({ children, className = '', ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    };

    button.addEventListener('mousemove', handleMouseMove);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`
        relative 
        appearance-none 
        overflow-hidden 
        rounded-lg 
        px-8 
        py-4 
        text-white 
        border
        border-white
        text-lg 
        font-medium 
        cursor-pointer 
        outline-none 
        bg-[#000000]
        before:content-[''] 
        before:absolute 
        before:left-[var(--x)] 
        before:top-[var(--y)] 
        before:w-0 
        before:h-0 
        before:bg-[radial-gradient(circle_closest-side,#3a3a3a,transparent)] 
        before:transform 
        before:translate-x-[-50%] 
        before:translate-y-[-50%] 
        before:transition-all 
        before:duration-200 
        before:ease-in 
        hover:before:w-[400px] 
        hover:before:h-[400px]
        ${className}
      `}
      {...props}
    >
      <span className="relative pointer-events-none">{children}</span>
    </button>
  );
};

export default Button;