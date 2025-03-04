
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepGlowProps {
  className?: string;
  color: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizes = {
  sm: "h-32 w-32",
  md: "h-40 w-40",
  lg: "h-48 w-48",
};

const StepGlow = ({ 
  className, 
  color, 
  size = "md", 
  children 
}: StepGlowProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        style={{ backgroundColor: color }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full opacity-50 blur-xl"
        style={{ backgroundColor: color }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        {children}
      </div>
    </div>
  );
};

export { StepGlow };
