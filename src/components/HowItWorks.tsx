
import { useEffect, useState, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const steps: Step[] = [
  {
    title: 'Select Your Models',
    description: 'Browse our extensive collection of AI models, and select the ones that fit your needs.',
    icon: '🔍',
    details: [
      'Access over 500+ pre-trained AI models from leading providers',
      'Filter by task type, performance metrics, or licensing options',
      'Preview model capabilities with sample inputs before adding to your pipeline',
      'Import custom models from Hugging Face or your own repositories'
    ]
  },
  {
    title: 'Design Your Pipeline',
    description: 'Drag and drop models onto the canvas and connect them to create your custom workflow.',
    icon: '🔄',
    details: [
      'Intuitive drag-and-drop interface with real-time connections',
      'Configure each model with parameters specific to your use case',
      'Add conditional logic, loops, and parallel processing paths',
      'Save pipeline templates for reuse across projects'
    ]
  },
  {
    title: 'Test & Refine',
    description: 'Test your pipeline with sample data and refine it until it works exactly as you need.',
    icon: '📊',
    details: [
      'Run tests on small data samples to verify pipeline behavior',
      'Visualize performance metrics and identify bottlenecks',
      'A/B test different model configurations to optimize results',
      'Automatic error detection and suggested fixes'
    ]
  },
  {
    title: 'Deploy & Scale',
    description: "Once you're satisfied, deploy your pipeline to production with a single click.",
    icon: '🚀',
    details: [
      'One-click deployment to cloud infrastructure or on-premises',
      'Auto-scaling based on workload demands and traffic patterns',
      'Comprehensive monitoring dashboards and alerts',
      'Version control and rollback capabilities for safe updates'
    ]
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
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05] animate-pulse"></div>
      
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">How Piper Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Building AI pipelines has never been easier. Follow these simple steps to create your own custom AI workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-4 order-2 md:order-1">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`neo-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeIndex === index 
                    ? 'border-primary/50 shadow-glow' 
                    : 'border-border hover:border-border/80'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl ${activeIndex === index ? 'scale-110' : ''} transition-transform`}>
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
                    <div className="text-6xl mb-6 mx-auto animate-float">{step.icon}</div>
                    <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                    <div className="flex flex-col gap-4 max-w-lg mx-auto text-left">
                      {step.details.map((detail, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2 animate-fade-in" 
                          style={{ animationDelay: `${i * 150}ms` }}
                        >
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <p>{detail}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 opacity-80 animate-slide-up animation-delay-300">
                      <Button size="sm" variant="outline" className="rounded-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
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
