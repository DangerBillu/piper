
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Server, Shield, Code, Globe, Zap, ArrowRight, Box, Activity, Lock, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const DatabaseSection = () => {
  const [activeTab, setActiveTab] = useState<'postgresql' | 'mongodb' | 'vector'>('postgresql');
  const [isHovering, setIsHovering] = useState(false);
  const [linesAnimating, setLinesAnimating] = useState(false);

  useEffect(() => {
    // Trigger lines animation whenever tab changes
    setLinesAnimating(true);
    const timer = setTimeout(() => setLinesAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    color: string;
  }

  const databases: Record<typeof activeTab, {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: Feature[];
    code: string;
  }> = {
    postgresql: {
      title: "PostgreSQL Integration",
      description: "Connect your pipelines directly to PostgreSQL databases for structured data storage with SQL querying capabilities.",
      icon: <Database className="h-8 w-8 text-blue-400" />,
      features: [
        {
          title: "Relational Data Models",
          description: "Store complex relationships between models, pipelines, and execution results with full referential integrity.",
          icon: <Server className="h-6 w-6" />,
          color: "from-blue-500/20 to-indigo-600/20",
        },
        {
          title: "Enterprise Security",
          description: "Row-level security, SSL encryption, and detailed access control for sensitive AI applications.",
          icon: <Shield className="h-6 w-6" />,
          badge: "Enterprise",
          color: "from-indigo-500/20 to-purple-600/20",
        },
        {
          title: "Vector Extensions",
          description: "Native pgvector extension for storing embeddings alongside structured data.",
          icon: <Code className="h-6 w-6" />,
          badge: "New",
          color: "from-purple-500/20 to-violet-600/20",
        },
      ],
      code: `-- Create tables for Piper's AI pipeline data
CREATE TABLE pipelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  owner_id UUID REFERENCES users(id),
  is_public BOOLEAN DEFAULT false
);

CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(100) NOT NULL,
  model_type VARCHAR(50) NOT NULL,
  api_endpoint TEXT,
  config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE pipeline_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  model_id UUID REFERENCES models(id),
  node_type VARCHAR(50) NOT NULL,
  config JSONB,
  position_x INTEGER,
  position_y INTEGER
);

CREATE TABLE node_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  source_node_id UUID REFERENCES pipeline_nodes(id) ON DELETE CASCADE,
  target_node_id UUID REFERENCES pipeline_nodes(id) ON DELETE CASCADE,
  connection_type VARCHAR(50) DEFAULT 'standard'
);

-- Add vector support for embeddings (requires pgvector extension)
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  node_id UUID REFERENCES pipeline_nodes(id) ON DELETE CASCADE,
  embedding vector(1536),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for similarity search
CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);`,
    },
    mongodb: {
      title: "MongoDB Integration",
      description: "Store unstructured and semi-structured data with MongoDB's flexible document-based model.",
      icon: <Database className="h-8 w-8 text-green-400" />,
      features: [
        {
          title: "Schema-Free Design",
          description: "Ideal for AI workflows with evolving data structures and varying outputs from different models.",
          icon: <Box className="h-6 w-6" />,
          color: "from-green-500/20 to-emerald-600/20",
        },
        {
          title: "Real-Time Pipelines",
          description: "Use change streams to trigger pipeline execution in response to data updates.",
          icon: <Activity className="h-6 w-6" />,
          badge: "Reactive",
          color: "from-emerald-500/20 to-teal-600/20",
        },
        {
          title: "Distributed Workloads",
          description: "Sharded collections for processing large-scale data across multiple clusters.",
          icon: <Cloud className="h-6 w-6" />,
          color: "from-teal-500/20 to-cyan-600/20",
        },
      ],
      code: `// MongoDB Schema for Piper's AI pipeline data
db.createCollection("pipelines", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "owner_id"],
      properties: {
        name: {
          bsonType: "string",
          description: "Pipeline name (required)"
        },
        description: {
          bsonType: "string",
          description: "Pipeline description"
        },
        owner_id: {
          bsonType: "objectId",
          description: "ID of the user who owns this pipeline (required)"
        },
        is_public: {
          bsonType: "bool",
          description: "Whether this pipeline is publicly accessible",
          default: false
        },
        nodes: {
          bsonType: "array",
          description: "Array of nodes in the pipeline",
          items: {
            bsonType: "object",
            required: ["node_type"],
            properties: {
              node_id: {
                bsonType: "string",
                description: "Unique identifier for this node"
              },
              node_type: {
                bsonType: "string",
                description: "Type of node (input, process, output)"
              },
              model_id: {
                bsonType: "objectId",
                description: "Reference to the model used by this node"
              },
              position: {
                bsonType: "object",
                properties: {
                  x: { bsonType: "int" },
                  y: { bsonType: "int" }
                }
              },
              config: {
                bsonType: "object",
                description: "Configuration for this node"
              }
            }
          }
        },
        connections: {
          bsonType: "array",
          description: "Connections between nodes",
          items: {
            bsonType: "object",
            required: ["source_id", "target_id"],
            properties: {
              source_id: {
                bsonType: "string",
                description: "ID of source node"
              },
              target_id: {
                bsonType: "string",
                description: "ID of target node"
              },
              connection_type: {
                bsonType: "string",
                default: "standard"
              }
            }
          }
        },
        created_at: {
          bsonType: "date",
          description: "Creation timestamp"
        },
        updated_at: {
          bsonType: "date",
          description: "Last update timestamp"
        }
      }
    }
  }
});

// Create vector search index for embeddings
db.embeddings.createIndex(
  { embedding: "vectorSearchIndex" },
  {
    name: "vector_index",
    vectorSearchOptions: {
      dimensions: 1536,
      similarity: "cosine",
      numLists: 100
    }
  }
);`,
    },
    vector: {
      title: "Vector Database Support",
      description: "Store and query embedding vectors from language, image, and multimodal AI models with specialized vector databases.",
      icon: <Database className="h-8 w-8 text-amber-400" />,
      features: [
        {
          title: "Semantic Search & Retrieval",
          description: "Find similar content, build recommendation systems, and enable RAG applications with vector similarity search.",
          icon: <Globe className="h-6 w-6" />,
          color: "from-amber-500/20 to-orange-600/20",
        },
        {
          title: "Hybrid Query Systems",
          description: "Combine metadata filtering with vector similarity for precise, context-aware results.",
          icon: <Zap className="h-6 w-6" />,
          badge: "Fast",
          color: "from-orange-500/20 to-red-600/20",
        },
        {
          title: "Multi-Modal Embedding",
          description: "Store text, image, and audio embeddings in a unified database for cross-modal applications.",
          icon: <Lock className="h-6 w-6" />,
          badge: "Advanced",
          color: "from-red-500/20 to-rose-600/20",
        },
      ],
      code: `// Integration with Pinecone Vector Database

import { PineconeClient } from '@pinecone-database/pinecone';

// Initialize Pinecone client
const pinecone = new PineconeClient();
await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT
});

// Create an index for pipeline embeddings
async function createPipelineIndex() {
  const indexName = 'piper-embeddings';
  const existingIndexes = await pinecone.listIndexes();
  
  if (!existingIndexes.includes(indexName)) {
    await pinecone.createIndex({
      name: indexName,
      dimension: 1536,  // OpenAI embedding dimension
      metric: 'cosine'
    });
    console.log(\`Created new index: \${indexName}\`);
  }
  
  return pinecone.Index(indexName);
}

// Store embeddings from pipeline execution
async function storeEmbedding(pipelineId, nodeId, embedding, metadata) {
  const index = await createPipelineIndex();
  
  const id = \`\${pipelineId}-\${nodeId}-\${Date.now()}\`;
  
  await index.upsert({
    vectors: [{
      id,
      values: embedding,
      metadata: {
        pipelineId,
        nodeId,
        timestamp: new Date().toISOString(),
        ...metadata
      }
    }]
  });
  
  return id;
}

// Query similar vectors
async function querySimilar(embedding, filter = {}, topK = 10) {
  const index = await createPipelineIndex();
  
  const results = await index.query({
    vector: embedding,
    topK,
    filter,
    includeMetadata: true
  });
  
  return results.matches;
}

// Example usage in a Piper pipeline
export async function processPipelineNode(node, input) {
  // Generate embedding from input using OpenAI
  const embedding = await generateEmbedding(input.text);
  
  // Store in vector database
  const embeddingId = await storeEmbedding(
    input.pipelineId,
    node.id,
    embedding,
    { sourceText: input.text.substring(0, 100) }
  );
  
  // Find similar content in database
  const similar = await querySimilar(embedding, {
    pipelineId: { $ne: input.pipelineId }  // Exclude current pipeline
  });
  
  return {
    embedding,
    embeddingId,
    similarContent: similar
  };
}`,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featureVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section id="database" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      
      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -right-[10%] top-[10%] w-1/3 h-1/3 rounded-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl"
          animate={{ 
            x: [-20, 20, -20], 
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -left-[10%] bottom-[20%] w-1/4 h-1/4 rounded-full bg-gradient-to-r from-secondary/10 to-transparent blur-3xl"
          animate={{ 
            x: [20, -20, 20], 
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Powerful Data Management
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Connect your AI pipelines with leading database solutions for seamless data flow and persistent storage.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-center space-x-2 mb-8 p-1 bg-secondary/50 rounded-full"
            >
              {(["postgresql", "mongodb", "vector"] as const).map((tab, index) => (
                <motion.button 
                  key={tab}
                  custom={index}
                  variants={tabVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeTab === tab ? 'bg-primary text-white' : 'hover:bg-secondary'
                  }`}
                  onClick={() => setActiveTab(tab)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {tab === 'postgresql' ? 'PostgreSQL' : tab === 'mongodb' ? 'MongoDB' : 'Vector DB'}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="neo-card p-8 shadow-glow border border-primary/5 backdrop-blur-sm bg-background/40 relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Decorative tech lines/circles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full opacity-10"
                  animate={{ 
                    opacity: linesAnimating ? [0.1, 0.3, 0.1] : 0.1
                  }}
                  transition={{ duration: 1.5 }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M30,50 L100,50 L150,100 L250,100 L300,50 L370,50" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      fill="none"
                      strokeDasharray="5,5"
                      animate={{ 
                        strokeDashoffset: linesAnimating ? [0, -20] : 0
                      }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                    <motion.path 
                      d="M30,150 L100,150 L150,100 L250,100 L300,150 L370,150" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      fill="none"
                      strokeDasharray="5,5"
                      animate={{ 
                        strokeDashoffset: linesAnimating ? [0, 20] : 0
                      }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="150" cy="100" r="4" 
                      fill="currentColor"
                      animate={{ 
                        r: linesAnimating ? [4, 8, 4] : 4,
                        opacity: linesAnimating ? [1, 0.5, 1] : 1
                      }}
                      transition={{ duration: 1.5 }}
                    />
                    <motion.circle 
                      cx="250" cy="100" r="4" 
                      fill="currentColor"
                      animate={{ 
                        r: linesAnimating ? [4, 8, 4] : 4,
                        opacity: linesAnimating ? [1, 0.5, 1] : 1
                      }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </svg>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  variants={containerVariants}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gradient-to-br from-background to-background/40 p-3 rounded-xl border border-primary/10 shadow-sm"
                    >
                      {databases[activeTab].icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{databases[activeTab].title}</h3>
                      <p className="text-muted-foreground">
                        {databases[activeTab].description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 mt-8">
                    {databases[activeTab].features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        variants={featureVariants}
                        className="flex items-start gap-4"
                      >
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/10 flex-shrink-0`}
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-semibold">{feature.title}</h4>
                            {feature.badge && (
                              <Badge variant="outline" className="text-xs bg-primary/10">
                                {feature.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-[400px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-full h-full bg-background/5 backdrop-blur-sm border border-primary/10 overflow-hidden shadow-xl">
                <CardContent className="p-0 h-full">
                  <div className="bg-black/90 h-full text-xs md:text-sm font-mono p-4 text-green-400 overflow-auto relative">
                    {/* Animated cursor */}
                    <motion.div 
                      className="absolute h-4 w-2 bg-green-400"
                      animate={{ 
                        opacity: [1, 0, 1],
                        x: [0, 0],
                      }}
                      transition={{ 
                        opacity: { duration: 0.8, repeat: Infinity },
                        x: { duration: 0.1 }
                      }}
                      style={{ left: "4px", top: "4px" }}
                    />
                    
                    <AnimatePresence mode="wait">
                      <motion.pre
                        key={activeTab}
                        className="pl-3 whitespace-pre-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {databases[activeTab].code}
                      </motion.pre>
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button 
            size="lg" 
            className="rounded-full shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Database Options <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DatabaseSection;
