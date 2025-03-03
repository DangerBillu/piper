
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PipelineBuilder from '@/components/PipelineBuilder';
import ModelExplorer from '@/components/ModelExplorer';
import HowItWorks from '@/components/HowItWorks';
import DatabaseSection from '@/components/DatabaseSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <PipelineBuilder />
        <ModelExplorer />
        <HowItWorks />
        <DatabaseSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
