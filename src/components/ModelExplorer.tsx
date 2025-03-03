
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Star, Terminal, Image, FileText, Cpu, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type ModelCategory = 'All' | 'Text' | 'Image' | 'Audio' | 'Multimodal';

interface Model {
  id: string;
  name: string;
  description: string;
  category: ModelCategory;
  provider: string;
  stars: number;
  new?: boolean;
}

const models: Model[] = [
  {
    id: 'gpt4o',
    name: 'GPT-4o',
    description: 'State-of-the-art large language model for text generation and understanding.',
    category: 'Text',
    provider: 'OpenAI',
    stars: 4.9,
    new: true
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal AI model that can understand text, images, and code.',
    category: 'Multimodal',
    provider: 'Google',
    stars: 4.7
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    description: 'Advanced image generation model with high quality outputs.',
    category: 'Image',
    provider: 'Stability AI',
    stars: 4.8
  },
  {
    id: 'whisper-large',
    name: 'Whisper Large v3',
    description: 'Speech recognition system for transcription and translation.',
    category: 'Audio',
    provider: 'OpenAI',
    stars: 4.6
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Opus',
    description: 'Conversational AI assistant with state-of-the-art reasoning.',
    category: 'Text',
    provider: 'Anthropic',
    stars: 4.8,
    new: true
  },
  {
    id: 'llama-3',
    name: 'Llama 3',
    description: 'Open source large language model with strong performance.',
    category: 'Text',
    provider: 'Meta',
    stars: 4.5
  },
];

const ModelExplorer = () => {
  const [activeCategory, setActiveCategory] = useState<ModelCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModels, setFilteredModels] = useState(models);

  const categories: ModelCategory[] = ['All', 'Text', 'Image', 'Audio', 'Multimodal'];

  useEffect(() => {
    let result = [...models];
    
    if (activeCategory !== 'All') {
      result = result.filter(model => model.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(model => 
        model.name.toLowerCase().includes(query) || 
        model.description.toLowerCase().includes(query) || 
        model.provider.toLowerCase().includes(query)
      );
    }
    
    setFilteredModels(result);
  }, [activeCategory, searchQuery]);

  const getCategoryIcon = (category: ModelCategory) => {
    switch (category) {
      case 'Text':
        return <FileText className="h-4 w-4" />;
      case 'Image':
        return <Image className="h-4 w-4" />;
      case 'Audio':
        return <Terminal className="h-4 w-4" />;
      case 'Multimodal':
        return <Cpu className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <section id="models" className="py-24 relative">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Models</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of state-of-the-art AI models that you can use in your pipelines.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category}</span>
                </Button>
              ))}
            </div>
            
            <div className="relative w-full sm:w-auto mt-4 sm:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 w-full sm:w-[250px] rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <Card 
              key={model.id}
              className="backdrop-blur-sm bg-background/50 dark:bg-background/20 border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{model.name}</h3>
                    <p className="text-sm text-muted-foreground">{model.provider}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{model.stars}</span>
                  </div>
                </div>
                
                <p className="text-sm mb-4">{model.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      {getCategoryIcon(model.category)}
                      {model.category}
                    </Badge>
                    {model.new && (
                      <Badge className="bg-primary text-xs">New</Badge>
                    )}
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-xs">
                    Add to Pipeline
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelExplorer;
