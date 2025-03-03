
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Server, Shield, Code, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DatabaseSection = () => {
  const [activeTab, setActiveTab] = useState<'postgresql' | 'mongodb' | 'vector'>('postgresql');

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
      
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Data Management</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect your AI pipelines with leading database solutions for seamless data flow and persistent storage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center space-x-2 mb-8 p-1 bg-secondary/50 rounded-full"
            >
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === 'postgresql' ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('postgresql')}
              >
                PostgreSQL
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === 'mongodb' ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('mongodb')}
              >
                MongoDB
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === 'vector' ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('vector')}
              >
                Vector DB
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="neo-card p-8 shadow-glow"
            >
              {activeTab === 'postgresql' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Database className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">PostgreSQL Integration</h3>
                      <p className="text-muted-foreground">
                        Connect your pipelines directly to PostgreSQL databases for structured data storage with SQL querying capabilities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Server className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Relational Data Models</h3>
                      <p className="text-muted-foreground">
                        Store complex relationships between models, pipelines, and execution results with full referential integrity.
                      </p>
                    </div>
                  </div>
                  <div className="pl-12 border-l-2 border-primary/20 mt-8">
                    <ul className="space-y-2 text-sm">
                      <li className="text-muted-foreground">• pgvector extension support for embedding storage</li>
                      <li className="text-muted-foreground">• JSON/JSONB support for flexible schema</li>
                      <li className="text-muted-foreground">• Row-level security for multi-tenant applications</li>
                      <li className="text-muted-foreground">• Real-time change data capture with logical replication</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'mongodb' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Database className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">MongoDB Integration</h3>
                      <p className="text-muted-foreground">
                        Store unstructured and semi-structured data with MongoDB's flexible document-based model.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Code className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Schema-Free Design</h3>
                      <p className="text-muted-foreground">
                        Ideal for AI workflows with evolving data structures and varying outputs from different models.
                      </p>
                    </div>
                  </div>
                  <div className="pl-12 border-l-2 border-primary/20 mt-8">
                    <ul className="space-y-2 text-sm">
                      <li className="text-muted-foreground">• Atlas Vector Search for semantic search capabilities</li>
                      <li className="text-muted-foreground">• Aggregation pipeline for data transformation</li>
                      <li className="text-muted-foreground">• Automatic sharding for horizontal scaling</li>
                      <li className="text-muted-foreground">• Change streams for real-time pipeline triggers</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'vector' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Vector Database Support</h3>
                      <p className="text-muted-foreground">
                        Store and query embedding vectors from language, image, and multimodal AI models with specialized vector databases.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Code className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Semantic Search & Retrieval</h3>
                      <p className="text-muted-foreground">
                        Find similar content, build recommendation systems, and enable RAG applications with vector similarity search.
                      </p>
                    </div>
                  </div>
                  <div className="pl-12 border-l-2 border-primary/20 mt-8">
                    <ul className="space-y-2 text-sm">
                      <li className="text-muted-foreground">• Integration with Pinecone, Qdrant, and Milvus</li>
                      <li className="text-muted-foreground">• Configurable distance metrics (cosine, euclidean, dot product)</li>
                      <li className="text-muted-foreground">• Hybrid search combining vectors and metadata filtering</li>
                      <li className="text-muted-foreground">• Efficient ANN algorithms for billion-scale vector searches</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-[400px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-full h-full bg-secondary/10 backdrop-blur-sm border border-primary/10 overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="bg-black/80 h-full text-xs md:text-sm font-mono p-4 text-green-400 overflow-auto">
                    {activeTab === 'postgresql' && (
                      <pre className="whitespace-pre-wrap">
{`-- Create tables for Piper's AI pipeline data
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
  WITH (lists = 100);`}
                      </pre>
                    )}
                    
                    {activeTab === 'mongodb' && (
                      <pre className="whitespace-pre-wrap">
{`// MongoDB Schema for Piper's AI pipeline data
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
);`}
                      </pre>
                    )}
                    
                    {activeTab === 'vector' && (
                      <pre className="whitespace-pre-wrap">
{`// Integration with Pinecone Vector Database

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
}`}
                      </pre>
                    )}
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
          <Button size="lg" className="rounded-full shadow-glow">
            Explore Database Options <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DatabaseSection;
