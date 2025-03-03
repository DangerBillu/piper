
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = event;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      elements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '1');
        const el = element as HTMLElement;
        el.style.transform = `translate(${x * speed * 25}px, ${y * speed * 25}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" ref={containerRef}>
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      
      {/* Animated Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-element absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 animate-float" data-speed="1.2"></div>
        <div className="parallax-element absolute bottom-[25%] right-[10%] w-40 h-40 rounded-full bg-primary/10 dark:bg-primary/20 animate-float" style={{ animationDelay: '-2s' }} data-speed="1.5"></div>
        <div className="parallax-element absolute top-[30%] right-[25%] w-24 h-24 rounded-md bg-primary/5 dark:bg-primary/10 animate-spin-slow" data-speed="1.8"></div>
        <div className="parallax-element absolute bottom-[15%] left-[20%] w-32 h-32 rounded-md bg-primary/5 dark:bg-primary/10 animate-spin-slow" style={{ animationDelay: '-5s' }} data-speed="1.1"></div>
      </div>
      
      <div className="container px-6 md:px-12 mx-auto">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up text-balance">
            Build AI Pipelines with 
            <span className="text-primary block md:inline"> Piper</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up animation-delay-200 max-w-2xl mx-auto">
            Build, test, and deploy AI workflows with an intuitive drag-and-drop interface. 
            Connect models to create sophisticated AI applications without code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-300">
            <Button size="lg" className="rounded-full px-8 shadow-glow">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center">
          <div className="w-1 h-2 bg-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
