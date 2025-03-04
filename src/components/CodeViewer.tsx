
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Copy, Terminal, CheckCheck, 
  Code2, Code, LucideIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  content: string;
}

const tabs: TabItem[] = [
  {
    id: 'python',
    label: 'Python',
    icon: Code,
    content: `# Import the PiperAI SDK
from piper_ai import PiperClient, Pipeline, Models

# Initialize client with your API key
client = PiperClient(api_key="your_api_key_here")

# Create a new pipeline
pipeline = Pipeline("text-to-speech")

# Add models to the pipeline
pipeline.add_node(
    Models.TEXT.GPT4O, 
    params={
        "max_tokens": 1000,
        "temperature": 0.7
    },
    position=(0, 0)
)

pipeline.add_node(
    Models.AUDIO.ELEVENLABS_TTS,
    params={
        "voice_id": "Antoni",
        "stability": 0.5,
        "similarity_boost": 0.75
    },
    position=(300, 0)
)

# Connect nodes
pipeline.connect(0, 1)

# Process input through the pipeline
result = pipeline.process("Generate a short story about a robot learning to paint.")

# Save the audio output
with open("story.mp3", "wb") as f:
    f.write(result.audio_data)

print("Pipeline executed successfully!")
`
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: Code2,
    content: `import { PiperClient, Pipeline, Models } from 'piper-ai';

// Initialize client with your API key
const client = new PiperClient({ 
  apiKey: 'your_api_key_here' 
});

// Create a new pipeline
const pipeline = new Pipeline('image-generation');

// Add models to the pipeline
pipeline.addNode({
  model: Models.TEXT.GPT4O,
  params: {
    maxTokens: 1000,
    temperature: 0.7
  },
  position: { x: 0, y: 0 }
});

pipeline.addNode({
  model: Models.IMAGE.DALLE3,
  params: {
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid'
  },
  position: { x: 300, y: 0 }
});

// Connect nodes
pipeline.connect(0, 1);

// Process input through the pipeline
async function generateImage() {
  try {
    const result = await pipeline.process(
      'A futuristic city with flying cars and neon lights'
    );
    
    // Save the image
    await result.saveImage('futuristic_city.png');
    
    console.log('Image generated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

generateImage();
`
  },
  {
    id: 'cli',
    label: 'CLI',
    icon: Terminal,
    content: `# Install the Piper CLI
npm install -g @piper-ai/cli

# Log in with your API key
piper login --key your_api_key_here

# Create a new pipeline
piper pipeline create video-generation

# Add models to your pipeline
piper pipeline add-node \\
  --model text.gpt4o \\
  --name "Script Generator" \\
  --params '{"maxTokens": 2000, "temperature": 0.8}' \\
  --position "0,0"

piper pipeline add-node \\
  --model image.stability \\
  --name "Image Generator" \\
  --params '{"steps": 50, "cfg_scale": 7.5}' \\
  --position "300,0"

piper pipeline add-node \\
  --model video.runway \\
  --name "Video Generator" \\
  --params '{"frames": 24, "motion_strength": 0.8}' \\
  --position "600,0"

# Connect the nodes
piper pipeline connect 0 1
piper pipeline connect 1 2

# Execute the pipeline
piper pipeline run \\
  --input "A cat playing piano in a jazz club" \\
  --output ./generated_video.mp4

# Pipeline execution completed successfully
`
  }
];

const CodeViewer = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [copied, setCopied] = useState(false);

  const getActiveTab = () => {
    return tabs.find(tab => tab.id === activeTab) || tabs[0];
  };

  const copyToClipboard = async () => {
    const activeTabContent = getActiveTab().content;
    await navigator.clipboard.writeText(activeTabContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="overflow-hidden rounded-xl border bg-background/50 dark:bg-background/20 backdrop-blur-sm shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs gap-1.5 ${isActive ? '' : 'text-muted-foreground'}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </Button>
            );
          })}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8"
        >
          {copied ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="relative">
        <pre className="max-h-[400px] overflow-auto p-4 text-sm">
          <code className="font-mono text-foreground whitespace-pre-wrap">{getActiveTab().content}</code>
        </pre>
        <div className="absolute top-2 right-5 flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeViewer;
