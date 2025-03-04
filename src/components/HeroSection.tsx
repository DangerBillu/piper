
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { StepGlow } from '@/components/ui/step-glow';

function ElegantShape({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.15]",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full
            bg-gradient-to-r to-transparent ${gradient}
            backdrop-blur-[2px] border-2 border-white/[0.15] dark:border-white/[0.1]
            shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]
            after:absolute after:inset-0 after:rounded-full
            after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

const HeroSection = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-purple-500/[0.05] dark:from-primary/[0.02] dark:to-purple-500/[0.02] blur-3xl" />
      
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-purple-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-cyan-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-emerald-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />

        {/* Additional futuristic elements */}
        <motion.div 
          className="absolute right-[5%] top-[25%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <StepGlow color="#3b82f6" size="lg">
            <motion.div
              className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </StepGlow>
        </motion.div>

        <motion.div 
          className="absolute left-[12%] top-[60%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        >
          <StepGlow color="#a855f7" size="md">
            <motion.div
              className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </StepGlow>
        </motion.div>
      </div>
      
      <div className="container px-6 md:px-12 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] dark:bg-foreground/[0.03] border border-white/[0.08] dark:border-foreground/[0.08] mb-8"
          >
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">P</span>
            </div>
            <span className="text-sm text-white/60 dark:text-foreground/60 tracking-wide">Build AI Pipelines</span>
          </motion.div>
          
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 dark:from-foreground dark:to-foreground/80">Chain AI Models With</span>
              <span className="text-primary block md:inline"> Piper</span>
            </h1>
          </motion.div>
          
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-lg md:text-xl text-white/40 dark:text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build, test, and deploy AI workflows with an intuitive drag-and-drop interface. 
              Connect models to create sophisticated AI applications without code.
            </p>
          </motion.div>
          
          <motion.div 
            custom={3} 
            variants={fadeUpVariants} 
            initial="hidden" 
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="rounded-full px-8 shadow-glow bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-white/[0.03] dark:bg-foreground/[0.03] border border-white/[0.08] dark:border-foreground/[0.08] text-white/80 dark:text-foreground/80 hover:bg-white/[0.05] dark:hover:bg-foreground/[0.05]">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 dark:border-foreground/30 flex justify-center">
          <div className="w-1 h-2 bg-white/50 dark:bg-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
