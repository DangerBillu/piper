"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button2"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, FileText, Code, Music, Video, Star, Plus } from "lucide-react"

type ModelCategory = "all" | "vision" | "text" | "audio" | "video" | "code"

type Model = {
  id: string
  name: string
  description: string
  category: ModelCategory[]
  provider: string
  stars: number
  isNew?: boolean
  isFeatured?: boolean
}

const models: Model[] = [
  {
    id: "model1",
    name: "GPT-4o",
    description: "Advanced multimodal model for text, vision, and reasoning tasks",
    category: ["text", "vision"],
    provider: "OpenAI",
    stars: 4.9,
    isFeatured: true,
  },
  {
    id: "model2",
    name: "Claude 3 Opus",
    description: "State-of-the-art language model with strong reasoning capabilities",
    category: ["text"],
    provider: "Anthropic",
    stars: 4.8,
  },
  {
    id: "model3",
    name: "DALL-E 3",
    description: "Generate high-quality images from text descriptions",
    category: ["vision"],
    provider: "OpenAI",
    stars: 4.7,
  },
  {
    id: "model4",
    name: "Whisper v3",
    description: "Accurate speech recognition and transcription model",
    category: ["audio"],
    provider: "OpenAI",
    stars: 4.6,
  },
  {
    id: "model5",
    name: "CodeLlama",
    description: "Specialized model for code generation and completion",
    category: ["code"],
    provider: "Meta",
    stars: 4.5,
  },
  {
    id: "model6",
    name: "Stable Video",
    description: "Generate short videos from text prompts",
    category: ["video"],
    provider: "Stability AI",
    stars: 4.4,
    isNew: true,
  },
  {
    id: "model7",
    name: "MusicGen",
    description: "Generate music from text descriptions",
    category: ["audio"],
    provider: "Meta",
    stars: 4.3,
  },
  {
    id: "model8",
    name: "Gemini Pro",
    description: "Multimodal model for text, vision, and reasoning",
    category: ["text", "vision"],
    provider: "Google",
    stars: 4.7,
  },
]

export default function ExploreModels() {
  const [activeCategory, setActiveCategory] = useState<ModelCategory>("all")

  const filteredModels = models.filter((model) => activeCategory === "all" || model.category.includes(activeCategory))

  const getCategoryIcon = (category: ModelCategory) => {
    switch (category) {
      case "vision":
        return <Image className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <section id="models" className="relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Explore Models</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Browse our collection of state-of-the-art AI models that you can use in your pipelines. We support models from
          leading providers across various domains.
        </p>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={(v) => setActiveCategory(v as ModelCategory)}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vision" className="flex items-center gap-1">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Vision</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-1">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Code</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredModels.map((model) => (
              <Card
                key={model.id}
                className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {model.category.map((cat) => (
                        <div key={cat} className="text-primary">
                          {getCategoryIcon(cat)}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="fill-amber-400 h-4 w-4" />
                      <span className="text-sm">{model.stars}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{model.name}</h3>
                  <p className="text-sm text-foreground/70 mb-2">{model.provider}</p>

                  <div className="mb-4">
                    {model.isNew && (
                      <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 mr-2">New</Badge>
                    )}
                    {model.isFeatured && (
                      <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">Featured</Badge>
                    )}
                  </div>

                  <p className="text-sm text-foreground/70 h-12 overflow-hidden">{model.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Pipeline
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}