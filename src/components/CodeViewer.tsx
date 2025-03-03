
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Language = 'python' | 'javascript' | 'typescript' | 'go';

const codeExamples = {
  python: `from chainai import Pipeline, Models

# Initialize the pipeline
pipeline = Pipeline()

# Add models to the pipeline
pipeline.add_model(Models.GPT4())
pipeline.add_model(Models.ImageAnalyzer())
pipeline.add_model(Models.TextSummarizer())

# Connect the models
pipeline.connect("GPT4", "ImageAnalyzer")
pipeline.connect("ImageAnalyzer", "TextSummarizer")

# Set up the input
input_data = {
    "text": "Analyze this image and provide details",
    "image": "image.jpg"
}

# Execute the pipeline
result = pipeline.execute(input_data)
print(result)`,

  javascript: `import { Pipeline, Models } from 'chainai';

// Initialize the pipeline
const pipeline = new Pipeline();

// Add models to the pipeline
pipeline.addModel(Models.GPT4());
pipeline.addModel(Models.ImageAnalyzer());
pipeline.addModel(Models.TextSummarizer());

// Connect the models
pipeline.connect('GPT4', 'ImageAnalyzer');
pipeline.connect('ImageAnalyzer', 'TextSummarizer');

// Set up the input
const inputData = {
  text: 'Analyze this image and provide details',
  image: 'image.jpg'
};

// Execute the pipeline
pipeline.execute(inputData)
  .then(result => console.log(result))
  .catch(error => console.error(error));`,

  typescript: `import { Pipeline, Models, PipelineResult } from 'chainai';

// Initialize the pipeline
const pipeline = new Pipeline();

// Add models to the pipeline
pipeline.addModel(Models.GPT4());
pipeline.addModel(Models.ImageAnalyzer());
pipeline.addModel(Models.TextSummarizer());

// Connect the models
pipeline.connect('GPT4', 'ImageAnalyzer');
pipeline.connect('ImageAnalyzer', 'TextSummarizer');

// Define the input interface
interface InputData {
  text: string;
  image: string;
}

// Set up the input
const inputData: InputData = {
  text: 'Analyze this image and provide details',
  image: 'image.jpg'
};

// Execute the pipeline
async function runPipeline(): Promise<void> {
  try {
    const result: PipelineResult = await pipeline.execute(inputData);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

runPipeline();`,

  go: `package main

import (
	"fmt"
	"log"

	"github.com/example/chainai"
)

func main() {
	// Initialize the pipeline
	pipeline := chainai.NewPipeline()

	// Add models to the pipeline
	pipeline.AddModel(chainai.Models.GPT4())
	pipeline.AddModel(chainai.Models.ImageAnalyzer())
	pipeline.AddModel(chainai.Models.TextSummarizer())

	// Connect the models
	pipeline.Connect("GPT4", "ImageAnalyzer")
	pipeline.Connect("ImageAnalyzer", "TextSummarizer")

	// Set up the input
	inputData := map[string]interface{}{
		"text":  "Analyze this image and provide details",
		"image": "image.jpg",
	}

	// Execute the pipeline
	result, err := pipeline.Execute(inputData)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)
}`
};

const CodeViewer = () => {
  const [language, setLanguage] = useState<Language>('python');

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <Card className="backdrop-blur-sm bg-background/50 dark:bg-background/20 border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/70"></div>
          </div>
          <p className="text-sm font-medium">pipeline_code.{language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language === 'go' ? 'go' : 'py'}</p>
        </div>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="font-mono whitespace-pre">
            {codeExamples[language]}
          </code>
        </pre>
      </div>
    </Card>
  );
};

export default CodeViewer;
