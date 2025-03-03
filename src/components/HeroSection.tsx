
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-secondary/[0.05] dark:from-primary/[0.02] dark:to-secondary/[0.02] blur-3xl" />
      
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
          gradient="from-secondary/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-primary/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-secondary/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-primary/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>
      
      <div className="container px-6 md:px-12 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/[0.03] border border-foreground/[0.08] mb-8"
          >
            <span className="text-sm text-foreground/60 tracking-wide">Build AI Pipelines</span>
          </motion.div>
          
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">Chain AI Models With</span>
              <span className="text-primary block md:inline"> Piper</span>
            </h1>
          </motion.div>
          
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
            <Button size="lg" className="rounded-full px-8 shadow-glow">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center">
          <div className="w-1 h-2 bg-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
