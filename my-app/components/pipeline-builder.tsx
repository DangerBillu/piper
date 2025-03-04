"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { motion } from "framer-motion"
import {
  Box,
  Code,
  Database,
  FileText,
  Filter,
  Layers,
  MessageSquare,
  Sparkles,
  X,
  Play,
  Save,
  Download,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Define the types for our pipeline nodes
type NodeType = "input" | "output" | "model" | "transform" | "filter" | "database" | "text" | "chat"

interface PipelineNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: {
    name: string
    description: string
    icon: React.ReactNode
    color: string
  }
  connections: string[]
}

// Sample models data
const availableModels = [
  { id: "gpt-4", name: "GPT-4", category: "text", description: "Advanced language model for text generation" },
  { id: "gpt-3.5", name: "GPT-3.5", category: "text", description: "Efficient language model for various text tasks" },
  { id: "claude-3", name: "Claude 3", category: "text", description: "Anthropic's conversational AI assistant" },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    category: "image",
    description: "Text-to-image generation model",
  },
  { id: "whisper", name: "Whisper", category: "audio", description: "Speech recognition and transcription model" },
  { id: "llama-3", name: "Llama 3", category: "text", description: "Open source large language model" },
  { id: "bert", name: "BERT", category: "embedding", description: "Bidirectional encoder for text embeddings" },
  { id: "clip", name: "CLIP", category: "multimodal", description: "Connects text and images for understanding" },
]

// Sample database connectors
const databaseConnectors = [
  { id: "postgres", name: "PostgreSQL", description: "SQL database connector" },
  { id: "mongodb", name: "MongoDB", description: "NoSQL document database" },
  { id: "redis", name: "Redis", description: "In-memory data structure store" },
  { id: "mysql", name: "MySQL", description: "Relational database management system" },
  { id: "supabase", name: "Supabase", description: "Open source Firebase alternative" },
]

// Sample code for different languages
const sampleCode = {
  python: `import openai
from langchain import PromptTemplate

# Initialize the model
model = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing."}
    ]
)

# Process the response
response = model.choices[0].message.content
print(response)`,
  javascript: `import { OpenAI } from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateText() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain quantum computing.' }
    ],
  });
  
  console.log(response.choices[0].message.content);
}

generateText();`,
  nodejs: `const { OpenAI } = require('openai');

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateText() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain quantum computing.' }
    ],
  });
  
  console.log(response.choices[0].message.content);
}

generateText();`,
}

// Node component for drag and drop
const DraggableNode = ({ node, onMove, onConnect, onDelete }) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id: node.id, type: node.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  drag(ref)

  // Handle node movement
  const handleMouseDown = (e) => {
    if (e.button !== 0) return

    const startX = e.clientX
    const startY = e.clientY
    const startPos = { ...node.position }

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      onMove(node.id, {
        x: startPos.x + dx,
        y: startPos.y + dy,
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "pipeline-node absolute",
        "bg-secondary/80 backdrop-blur-sm",
        isDragging ? "opacity-50" : "opacity-100",
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: 200,
        zIndex: isDragging ? 100 : 10,
        borderLeft: `4px solid ${node.data.color}`,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-md bg-${node.data.color}/10`}>{node.data.icon}</div>
          <h3 className="font-medium text-sm">{node.data.name}</h3>
        </div>
        <button
          onClick={() => onDelete(node.id)}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{node.data.description}</p>

      <div className="flex justify-between mt-2">
        <div className="w-3 h-3 rounded-full bg-primary cursor-pointer" onMouseDown={handleMouseDown} />
        <div className="w-3 h-3 rounded-full bg-primary cursor-pointer" onClick={() => onConnect(node.id)} />
      </div>
    </motion.div>
  )
}

// Connection line between nodes
const ConnectionLine = ({ start, end }) => {
  // Calculate the path for the connection
  const dx = end.x - start.x
  const dy = end.y - start.y
  const length = Math.sqrt(dx * dx + dy * dy)

  // Control point for the curve
  const cpx = start.x + dx / 2
  const cpy = start.y + dy / 2 - 50

  // Path for the connection
  const path = `M ${start.x + 200} ${start.y + 40} Q ${cpx} ${cpy} ${end.x} ${end.y + 40}`

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <path d={path} className="pipeline-connector pipeline-connector-path" markerEnd="url(#arrowhead)" />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          className="pipeline-connector-handle"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
    </svg>
  )
}

// Sidebar component with available nodes
const Sidebar = ({ onAddNode }) => {
  const nodeTypes = [
    {
      type: "input",
      name: "Input",
      description: "Starting point for data",
      icon: <FileText size={16} />,
      color: "green-500",
    },
    {
      type: "model",
      name: "AI Model",
      description: "Process with AI model",
      icon: <Sparkles size={16} />,
      color: "violet-500",
    },
    {
      type: "transform",
      name: "Transform",
      description: "Modify data format",
      icon: <Layers size={16} />,
      color: "blue-500",
    },
    {
      type: "filter",
      name: "Filter",
      description: "Filter data by criteria",
      icon: <Filter size={16} />,
      color: "yellow-500",
    },
    {
      type: "database",
      name: "Database",
      description: "Store or retrieve data",
      icon: <Database size={16} />,
      color: "cyan-500",
    },
    {
      type: "output",
      name: "Output",
      description: "Final result destination",
      icon: <Box size={16} />,
      color: "rose-500",
    },
    {
      type: "text",
      name: "Text Generator",
      description: "Generate text content",
      icon: <Code size={16} />,
      color: "purple-500",
    },
    {
      type: "chat",
      name: "Chat Interface",
      description: "Interactive chat component",
      icon: <MessageSquare size={16} />,
      color: "teal-500",
    },
  ]

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "node",
    drop: () => ({ name: "Sidebar" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div ref={drop} className="w-64 bg-background border-r border-border p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="p-3 rounded-md border border-border hover:border-primary/50 bg-secondary/50 cursor-grab transition-all"
            onClick={() => onAddNode(nodeType)}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded-md bg-${nodeType.color}/10 text-${nodeType.color}`}>{nodeType.icon}</div>
              <div>
                <h3 className="text-sm font-medium">{nodeType.name}</h3>
                <p className="text-xs text-muted-foreground">{nodeType.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Model Explorer component
const ModelExplorer = () => {
  const [category, setCategory] = useState("all")

  const filteredModels =
    category === "all" ? availableModels : availableModels.filter((model) => model.category === category)

  return (
    <div className="w-64 bg-background border-l border-border p-4">
      <h2 className="text-lg font-semibold mb-4">AI Models</h2>

      <div className="mb-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="text">Text Generation</SelectItem>
            <SelectItem value="image">Image Generation</SelectItem>
            <SelectItem value="audio">Audio Processing</SelectItem>
            <SelectItem value="embedding">Embeddings</SelectItem>
            <SelectItem value="multimodal">Multimodal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="p-3 rounded-md border border-border hover:border-primary/50 bg-secondary/50 transition-all"
          >
            <h3 className="text-sm font-medium">{model.name}</h3>
            <p className="text-xs text-muted-foreground">{model.description}</p>
            <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {model.category}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-4">Data Connectors</h2>
      <div className="space-y-3">
        {databaseConnectors.map((db) => (
          <div
            key={db.id}
            className="p-3 rounded-md border border-border hover:border-primary/50 bg-secondary/50 transition-all"
          >
            <h3 className="text-sm font-medium">{db.name}</h3>
            <p className="text-xs text-muted-foreground">{db.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Code Editor component
const CodeEditor = () => {
  const [language, setLanguage] = useState("python")

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b border-border">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="nodejs">Node.js</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Play size={14} className="mr-1" /> Run
          </Button>
          <Button size="sm" variant="outline">
            <Save size={14} className="mr-1" /> Save
          </Button>
        </div>
      </div>

      <div className="code-editor flex-1 overflow-auto">
        <pre>
          <code>{sampleCode[language]}</code>
        </pre>
      </div>
    </div>
  )
}

// Main Pipeline Builder component
export default function PipelineBuilder() {
  const [nodes, setNodes] = useState<PipelineNode[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("visual")

  // Add a new node to the pipeline
  const handleAddNode = (nodeType) => {
    const newNode: PipelineNode = {
      id: `node-${Date.now()}`,
      type: nodeType.type,
      position: { x: 300, y: 100 },
      data: {
        name: nodeType.name,
        description: nodeType.description,
        icon: nodeType.icon,
        color: nodeType.color,
      },
      connections: [],
    }

    setNodes([...nodes, newNode])
  }

  // Move a node in the pipeline
  const handleMoveNode = (id, position) => {
    setNodes(nodes.map((node) => (node.id === id ? { ...node, position } : node)))
  }

  // Connect nodes in the pipeline
  const handleConnectNode = (id) => {
    if (connecting === null) {
      // Start connecting
      setConnecting(id)
    } else if (connecting !== id) {
      // Complete connection
      setNodes(
        nodes.map((node) => (node.id === connecting ? { ...node, connections: [...node.connections, id] } : node)),
      )
      setConnecting(null)
    } else {
      // Cancel connection
      setConnecting(null)
    }
  }

  // Delete a node from the pipeline
  const handleDeleteNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id))
    // Also remove any connections to this node
    setNodes(
      nodes.map((node) => ({
        ...node,
        connections: node.connections.filter((connId) => connId !== id),
      })),
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Build your Pipeline</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" /> Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 size={16} className="mr-2" /> Share
            </Button>
            <Button variant="glow" size="sm">
              <Play size={16} className="mr-2" /> Run Pipeline
            </Button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar with components */}
          <Sidebar onAddNode={handleAddNode} />

          {/* Pipeline builder area */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b border-border p-2">
                <TabsList>
                  <TabsTrigger value="visual">Visual Builder</TabsTrigger>
                  <TabsTrigger value="code">Code View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="visual" className="flex-1 overflow-hidden">
                <div className="relative h-full overflow-auto bg-secondary/20 p-4">
                  {/* Connection lines */}
                  {nodes.map((node) =>
                    node.connections.map((targetId) => {
                      const targetNode = nodes.find((n) => n.id === targetId)
                      if (!targetNode) return null

                      return (
                        <ConnectionLine
                          key={`${node.id}-${targetId}`}
                          start={node.position}
                          end={targetNode.position}
                        />
                      )
                    }),
                  )}

                  {/* Nodes */}
                  {nodes.map((node) => (
                    <DraggableNode
                      key={node.id}
                      node={node}
                      onMove={handleMoveNode}
                      onConnect={handleConnectNode}
                      onDelete={handleDeleteNode}
                    />
                  ))}

                  {/* Connecting line when in connecting mode */}
                  {connecting && (
                    <div className="absolute inset-0 cursor-crosshair" onClick={() => setConnecting(null)} />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="code" className="flex-1 overflow-hidden">
                <CodeEditor />
              </TabsContent>
            </Tabs>
          </div>

          {/* Model explorer */}
          <ModelExplorer />
        </div>
      </div>
    </DndProvider>
  )
}

