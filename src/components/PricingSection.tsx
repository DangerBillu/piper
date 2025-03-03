
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PricingFeature {
  title: string;
  tooltip?: string;
  included: boolean | string;
}

interface PricingTier {
  name: string;
  description: string;
  price: string;
  frequency: string;
  features: PricingFeature[];
  highlight?: boolean;
  buttonText: string;
}

const PricingSection = () => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const tiers: PricingTier[] = [
    {
      name: 'Free',
      description: 'Perfect for trying out Piper',
      price: billingInterval === 'monthly' ? '$0' : '$0',
      frequency: billingInterval === 'monthly' ? '/month' : '/year',
      buttonText: 'Get Started',
      features: [
        { title: 'Up to 3 pipelines', included: true },
        { title: 'Basic models access', included: true },
        { title: 'Community support', included: true },
        { title: 'Basic analytics', included: true },
        { title: 'Pipeline templates', included: '5 templates' },
        { title: 'API calls', included: '1,000 calls/month' },
        { title: 'Custom models', included: false },
        { title: 'Team collaboration', included: false },
      ]
    },
    {
      name: 'Pro',
      description: 'Great for individuals and small teams',
      price: billingInterval === 'monthly' ? '$29' : '$290',
      frequency: billingInterval === 'monthly' ? '/month' : '/year',
      buttonText: 'Start Free Trial',
      highlight: true,
      features: [
        { title: 'Unlimited pipelines', included: true },
        { title: 'Premium models access', included: true },
        { title: 'Priority support', included: true },
        { title: 'Advanced analytics', tooltip: 'Includes real-time monitoring and alerts', included: true },
        { title: 'Pipeline templates', included: 'Unlimited' },
        { title: 'API calls', included: '50,000 calls/month' },
        { title: 'Custom models', included: '5 models' },
        { title: 'Team collaboration', included: '3 members' },
      ]
    },
    {
      name: 'Enterprise',
      description: 'For organizations with advanced needs',
      price: 'Custom',
      frequency: '',
      buttonText: 'Contact Sales',
      features: [
        { title: 'Unlimited pipelines', included: true },
        { title: 'All models access', included: true },
        { title: 'Dedicated support', tooltip: '24/7 dedicated support team', included: true },
        { title: 'Enterprise analytics', tooltip: 'Includes custom reporting and dashboards', included: true },
        { title: 'Pipeline templates', included: 'Unlimited' },
        { title: 'API calls', included: 'Unlimited' },
        { title: 'Custom models', included: 'Unlimited' },
        { title: 'Team collaboration', included: 'Unlimited' },
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">Pricing Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up animation-delay-200">
            Choose the perfect plan for your needs. All plans include updates and community support.
          </p>
          
          <div className="inline-flex items-center bg-secondary/50 p-1 rounded-full mb-8 animate-slide-up animation-delay-300">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingInterval === 'monthly' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-secondary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingInterval === 'yearly' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-secondary'
              }`}
            >
              Yearly <span className="text-xs opacity-75">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TooltipProvider>
            {tiers.map((tier, i) => (
              <Card 
                key={tier.name} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-glow animate-slide-up ${
                  tier.highlight ? 'border-primary shadow-glow' : ''
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                      POPULAR
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.frequency}</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className={`h-5 w-5 flex-shrink-0 ${
                          feature.included ? 'text-primary' : 'text-muted-foreground/40'
                        }`} />
                        <span className="text-sm">
                          {feature.title}
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 inline-block ml-1 text-muted-foreground/70" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                {feature.tooltip}
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {typeof feature.included === 'string' && (
                            <span className="text-muted-foreground ml-1">({feature.included})</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full rounded-full ${
                      tier.highlight ? 'bg-primary' : ''
                    }`}
                    variant={tier.highlight ? 'default' : 'outline'}
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TooltipProvider>
        </div>
        
        <div className="mt-16 text-center animate-slide-up animation-delay-500">
          <p className="text-muted-foreground mb-4">
            Need a custom plan? Contact our sales team for a tailored solution.
          </p>
          <Button variant="outline" className="rounded-full">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
