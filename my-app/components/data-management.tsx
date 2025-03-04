"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs2"
import { Button } from "@/components/ui/button2"
import { Database, Server, Cloud, ArrowRight, Check, FileJson, Table } from "lucide-react"

type DatabaseType = "postgresql" | "mongodb" | "mysql" | "redis" | "s3"

interface DatabaseInfo {
  name: string
  description: string
  icon: React.ElementType
  color: string
  features: string[]
}

const databases: Record<DatabaseType, DatabaseInfo> = {
  postgresql: {
    name: "PostgreSQL",
    description: "Powerful, open source object-relational database system with over 30 years of active development.",
    icon: Database,
    color: "#336791",
    features: [
      "Store structured data from your AI pipelines",
      "Query results with powerful SQL",
      "Use JSON fields for flexible schema",
      "Trigger pipeline runs on data changes",
    ],
  },
  mongodb: {
    name: "MongoDB",
    description: "Document database designed for ease of development and scaling with a flexible schema approach.",
    icon: FileJson,
    color: "#4DB33D",
    features: [
      "Store unstructured data from AI models",
      "Flexible document schema for varying outputs",
      "Scale horizontally with large datasets",
      "Native JSON support for AI results",
    ],
  },
  mysql: {
    name: "MySQL",
    description: "The world's most popular open source relational database for web applications.",
    icon: Table,
    color: "#4479A1",
    features: [
      "Reliable storage for structured AI outputs",
      "Efficient indexing for fast queries",
      "Integrate with existing applications",
      "Trigger pipelines based on data changes",
    ],
  },
  redis: {
    name: "Redis",
    description: "In-memory data structure store used as a database, cache, and message broker.",
    icon: Server,
    color: "#DC382D",
    features: [
      "Cache AI model results for faster access",
      "Pub/Sub for real-time pipeline notifications",
      "Store temporary processing results",
      "Rate limiting for API calls to AI services",
    ],
  },
  s3: {
    name: "S3 Storage",
    description: "Object storage service offering industry-leading scalability, availability, and durability.",
    icon: Cloud,
    color: "#FF9900",
    features: [
      "Store large files processed by AI models",
      "Archive pipeline results for compliance",
      "Trigger pipelines when new files are uploaded",
      "Scale storage without limits",
    ],
  },
}

export default function DataManagement() {
  const [activeTab, setActiveTab] = useState<DatabaseType>("postgresql")
  const [isConnected, setIsConnected] = useState<Record<DatabaseType, boolean>>({
    postgresql: false,
    mongodb: true,
    mysql: false,
    redis: true,
    s3: false,
  })

  const toggleConnection = (db: DatabaseType) => {
    setIsConnected((prev) => ({
      ...prev,
      [db]: !prev[db],
    }))
  }

  return (
    <section id="data-management" className="relative py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Powerful Data Management</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Connect your AI pipelines to popular databases and storage solutions. Store, query, and analyze your
          AI-generated data with ease.
        </p>
      </div>

      <Tabs
        defaultValue="postgresql"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as DatabaseType)}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 bg-black/20">
            <TabsTrigger value="postgresql" className="flex items-center gap-1 data-[state=active]:bg-[#336791]/20">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">PostgreSQL</span>
            </TabsTrigger>
            <TabsTrigger value="mongodb" className="flex items-center gap-1 data-[state=active]:bg-[#4DB33D]/20">
              <FileJson className="h-4 w-4" />
              <span className="hidden sm:inline">MongoDB</span>
            </TabsTrigger>
            <TabsTrigger value="mysql" className="flex items-center gap-1 data-[state=active]:bg-[#4479A1]/20">
              <Table className="h-4 w-4" />
              <span className="hidden sm:inline">MySQL</span>
            </TabsTrigger>
            <TabsTrigger value="redis" className="flex items-center gap-1 data-[state=active]:bg-[#DC382D]/20">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Redis</span>
            </TabsTrigger>
            <TabsTrigger value="s3" className="flex items-center gap-1 data-[state=active]:bg-[#FF9900]/20">
              <Cloud className="h-4 w-4" />
              <span className="hidden sm:inline">S3</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(databases).map(([key, db]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="p-4 border-b flex justify-between items-center"
                  style={{ borderColor: `${db.color}40` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: `${db.color}20` }}
                    >
                      <db.icon className="h-5 w-5" style={{ color: db.color }} />
                    </div>
                    <h3 className="font-medium">{db.name}</h3>
                  </div>
                  <Button
                    variant={isConnected[key as DatabaseType] ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleConnection(key as DatabaseType)}
                    className={isConnected[key as DatabaseType] ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {isConnected[key as DatabaseType] ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        Connect
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                      <p className="text-foreground/70 mb-6">{db.description}</p>

                      <h4 className="font-medium mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {db.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <div
                              className="mt-1 w-4 h-4 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${db.color}20` }}
                            >
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: db.color }} />
                            </div>
                            <span className="text-sm text-foreground/70">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div
                        className="rounded-lg p-4 h-64 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: `${db.color}10`, border: `1px solid ${db.color}30` }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="relative w-full h-full"
                        >
                          {key === "postgresql" && (
                            <div className="absolute inset-0 flex flex-col">
                              <div className="bg-black/40 p-2 text-xs font-mono text-green-300 rounded-t-md">
                                SQL Query
                              </div>
                              <div className="flex-1 bg-black/20 p-3 font-mono text-xs overflow-auto">
                                <div className="text-blue-400">SELECT</div>
                                <div className="pl-4 text-foreground/80">model_name,</div>
                                <div className="pl-4 text-foreground/80">input_data,</div>
                                <div className="pl-4 text-foreground/80">output_data,</div>
                                <div className="pl-4 text-foreground/80">execution_time,</div>
                                <div className="pl-4 text-foreground/80">created_at</div>
                                <div className="text-blue-400">FROM</div>
                                <div className="pl-4 text-foreground/80">pipeline_executions</div>
                                <div className="text-blue-400">WHERE</div>
                                <div className="pl-4 text-foreground/80">pipeline_id = 'abc123'</div>
                                <div className="text-blue-400">ORDER BY</div>
                                <div className="pl-4 text-foreground/80">created_at DESC</div>
                                <div className="text-blue-400">LIMIT</div>
                                <div className="pl-4 text-foreground/80">10;</div>
                              </div>
                            </div>
                          )}

                          {key === "mongodb" && (
                            <div className="absolute inset-0 flex flex-col">
                              <div className="bg-black/40 p-2 text-xs font-mono text-green-300 rounded-t-md">
                                MongoDB Query
                              </div>
                              <div className="flex-1 bg-black/20 p-3 font-mono text-xs overflow-auto">
                                <div className="text-blue-400">db.pipeline_results.find(&#123;</div>
                                <div className="pl-4 text-foreground/80">"pipeline_id": "abc123",</div>
                                <div className="pl-4 text-foreground/80">"status": "completed",</div>
                                <div className="pl-4 text-foreground/80">"created_at": &#123;</div>
                                <div className="pl-8 text-foreground/80">"$gte": ISODate("2023-01-01")</div>
                                <div className="pl-4 text-foreground/80">&#125;</div>
                                <div className="text-blue-400">&#125;).sort(&#123;</div>
                                <div className="pl-4 text-foreground/80">"created_at": -1</div>
                                <div className="text-blue-400">&#125;).limit(10);</div>
                              </div>
                            </div>
                          )}

                          {key === "mysql" && (
                            <div className="absolute inset-0 flex flex-col">
                              <div className="bg-black/40 p-2 text-xs font-mono text-green-300 rounded-t-md">
                                MySQL Query
                              </div>
                              <div className="flex-1 bg-black/20 p-3 font-mono text-xs overflow-auto">
                                <div className="text-blue-400">SELECT</div>
                                <div className="pl-4 text-foreground/80">p.name,</div>
                                <div className="pl-4 text-foreground/80">m.name AS model_name,</div>
                                <div className="pl-4 text-foreground/80">e.input_params,</div>
                                <div className="pl-4 text-foreground/80">e.output_data,</div>
                                <div className="pl-4 text-foreground/80">e.execution_time</div>
                                <div className="text-blue-400">FROM</div>
                                <div className="pl-4 text-foreground/80">executions e</div>
                                <div className="text-blue-400">JOIN</div>
                                <div className="pl-4 text-foreground/80">pipelines p ON e.pipeline_id = p.id</div>
                                <div className="text-blue-400">JOIN</div>
                                <div className="pl-4 text-foreground/80">models m ON e.model_id = m.id</div>
                                <div className="text-blue-400">WHERE</div>
                                <div className="pl-4 text-foreground/80">p.user_id = 42</div>
                                <div className="text-blue-400">ORDER BY</div>
                                <div className="pl-4 text-foreground/80">e.created_at DESC;</div>
                              </div>
                            </div>
                          )}

                          {key === "redis" && (
                            <div className="absolute inset-0 flex flex-col">
                              <div className="bg-black/40 p-2 text-xs font-mono text-green-300 rounded-t-md">
                                Redis Commands
                              </div>
                              <div className="flex-1 bg-black/20 p-3 font-mono text-xs overflow-auto">
                                <div className="text-blue-400">// Store pipeline result</div>
                                <div className="text-foreground/80">SET pipeline:result:123 "{`{...}`}"</div>
                                <div className="text-foreground/80">EXPIRE pipeline:result:123 3600</div>
                                <div className="mt-2 text-blue-400">// Publish event</div>
                                <div className="text-foreground/80">
                                  PUBLISH pipeline_events "Pipeline 123 completed"
                                </div>
                                <div className="mt-2 text-blue-400">// Increment counter</div>
                                <div className="text-foreground/80">INCR pipeline:123:execution_count</div>
                                <div className="mt-2 text-blue-400">// Get all recent results</div>
                                <div className="text-foreground/80">KEYS pipeline:result:*</div>
                              </div>
                            </div>
                          )}

                          {key === "s3" && (
                            <div className="absolute inset-0 flex flex-col">
                              <div className="bg-black/40 p-2 text-xs font-mono text-green-300 rounded-t-md">
                                S3 Operations
                              </div>
                              <div className="flex-1 bg-black/20 p-3 font-mono text-xs overflow-auto">
                                <div className="text-blue-400">// Upload result file</div>
                                <div className="text-foreground/80">s3.putObject(&#123;</div>
                                <div className="pl-4 text-foreground/80">Bucket: 'ai-pipeline-results',</div>
                                <div className="pl-4 text-foreground/80">Key: 'pipeline-123/result.json',</div>
                                <div className="pl-4 text-foreground/80">Body: JSON.stringify(result),</div>
                                <div className="pl-4 text-foreground/80">ContentType: 'application/json'</div>
                                <div className="text-foreground/80">&#125;);</div>
                                <div className="mt-2 text-blue-400">// List all results</div>
                                <div className="text-foreground/80">s3.listObjects(&#123;</div>
                                <div className="pl-4 text-foreground/80">Bucket: 'ai-pipeline-results',</div>
                                <div className="pl-4 text-foreground/80">Prefix: 'pipeline-123/'</div>
                                <div className="text-foreground/80">&#125;);</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </div>

                      <div className="mt-4 text-sm text-foreground/60">
                        <p>
                          Connect your {db.name} database to Chain AI to store and retrieve data from your pipelines.
                          Our integration supports all standard operations and provides optimized performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

