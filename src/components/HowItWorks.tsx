
import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: 'Select Your Models',
    description: 'Browse our extensive collection of AI models, and select the ones that fit your needs. From text generation to image analysis, we have it all.',
    icon: '🔍'
  },
  {
    title: 'Design Your Pipeline',
    description: 'Drag and drop models onto the canvas and connect them to create your custom workflow. Configure each model with the parameters you need.',
    icon: '🔄'
  },
  {
    title: 'Test & Refine',
    description: 'Test your pipeline with sample data and refine it until it works exactly as you need. Monitor performance and make adjustments in real-time.',
    icon: '📊'
  },
  {
    title: 'Deploy & Scale',
    description: "Once you're satisfied, deploy your pipeline to production with a single click. Scale automatically based on your workload needs.",
    icon: '🚀'
  }
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(item => item === entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      itemRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building AI pipelines has never been easier. Follow these simple steps to create your own custom AI workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-4 order-2 md:order-1">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`neo-card p-6 cursor-pointer transition-all duration-300 ${
                  activeIndex === index 
                    ? 'border-primary/50 shadow-glow' 
                    : 'border-border hover:border-border/80'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl ${activeIndex === index ? 'scale-110' : ''} transition-transform`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-8 order-1 md:order-2">
            <div className="h-[500px] neo-card flex items-center justify-center p-10 relative overflow-hidden">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center p-8 transition-all duration-500 
                    ${activeIndex === index 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                    }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6 mx-auto">{step.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <div className="flex flex-col gap-4 max-w-lg mx-auto text-left">
                      {step.description.split('. ').map((sentence, i) => (
                        sentence.trim() && (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <p>{sentence.trim()}.</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
