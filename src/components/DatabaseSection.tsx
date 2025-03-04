
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Database, SearchIcon, Star, ArrowRight, ChevronRight, Server, 
  Boxes, FileJson, BarChart, Workflow, Hexagon, Braces, Layers,
  Code, ArrowUpRight, Filter, ArrowDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { StepGlow } from '@/components/ui/step-glow';

type DatabaseCategory = 'All' | 'SQL' | 'NoSQL' | 'Vector' | 'Time-Series' | 'GraphDB';

interface DatabaseOption {
  id: string;
  name: string;
  description: string;
  category: DatabaseCategory;
  provider: string;
  stars: number;
  new?: boolean;
  icon: React.ReactNode;
  code?: string;
  color: string;
}

// Sample code blocks for each database
const postgresCode = `
// Connect to PostgreSQL
import { Client } from 'pg';

const client = new Client({
  host: process.env.PG_HOST,
  port: 5432,
  database: 'my_database',
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

await client.connect();

// Execute a query
const result = await client.query(
  'SELECT * FROM users WHERE status = $1',
  ['active']
);

console.log(result.rows);
`;

const mongoCode = `
// Connect to MongoDB
import { MongoClient } from 'mongodb';

const uri = \`mongodb+srv://\${process.env.MONGO_USER}:\${process.env.MONGO_PASSWORD}@cluster0.mongodb.net/?retryWrites=true&w=majority\`;
const client = new MongoClient(uri);

await client.connect();

// Query the database
const database = client.db('my_database');
const collection = database.collection('users');

const query = { status: 'active' };
const users = await collection.find(query).toArray();

console.log(users);
`;

const pineconeCode = `
// Connect to Pinecone
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index('my-index');

// Upsert vectors
await index.upsert([
  {
    id: 'vec1',
    values: [0.1, 0.2, 0.3, ...], // 1536-dim embedding vector
    metadata: { text: 'Sample document', category: 'article' }
  }
]);

// Vector search
const results = await index.query({
  vector: [0.1, 0.2, 0.3, ...],
  topK: 5,
  includeMetadata: true
});
`;

const databases: DatabaseOption[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Powerful, open source object-relational database system with strong reputation for reliability and performance.',
    category: 'SQL',
    provider: 'PostgreSQL Global Development Group',
    stars: 4.8,
    icon: <Database className="h-6 w-6 text-blue-500" />,
    code: postgresCode,
    color: '#3498db'
  },
  {
    id: 'mongodb',
    name: 'MongoDB Atlas',
    description: 'Fully-managed document database designed for modern applications, with automatic scaling and multi-cloud distribution.',
    category: 'NoSQL',
    provider: 'MongoDB, Inc.',
    stars: 4.7,
    icon: <Layers className="h-6 w-6 text-green-500" />,
    code: mongoCode,
    color: '#27ae60'
  },
  {
    id: 'pinecone',
    name: 'Pinecone Vector DB',
    description: 'Managed vector database designed for vector search at scale, optimized for AI and machine learning applications.',
    category: 'Vector',
    provider: 'Pinecone',
    stars: 4.6,
    new: true,
    icon: <Hexagon className="h-6 w-6 text-purple-500" />,
    code: pineconeCode,
    color: '#9b59b6'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    description: 'Popular open-source relational database management system, known for its reliability and ease of use.',
    category: 'SQL',
    provider: 'Oracle',
    stars: 4.5,
    icon: <Database className="h-6 w-6 text-blue-400" />,
    color: '#2980b9'
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'In-memory data structure store used as a database, cache, and message broker with optional persistence.',
    category: 'NoSQL',
    provider: 'Redis Ltd.',
    stars: 4.7,
    icon: <Server className="h-6 w-6 text-red-500" />,
    color: '#e74c3c'
  },
  {
    id: 'neo4j',
    name: 'Neo4j',
    description: 'Native graph database platform designed for storing and querying highly connected data with relationships.',
    category: 'GraphDB',
    provider: 'Neo4j, Inc.',
    stars: 4.4,
    icon: <Workflow className="h-6 w-6 text-orange-500" />,
    color: '#e67e22'
  },
  {
    id: 'chroma',
    name: 'Chroma DB',
    description: 'Open-source embedding database for AI applications with simple API for storing and searching vectors and metadata.',
    category: 'Vector',
    provider: 'Chroma',
    stars: 4.3,
    new: true,
    icon: <FileJson className="h-6 w-6 text-violet-500" />,
    color: '#8e44ad'
  },
  {
    id: 'timescaledb',
    name: 'TimescaleDB',
    description: 'Open-source time-series SQL database optimized for fast ingest and complex queries, built on PostgreSQL.',
    category: 'Time-Series',
    provider: 'Timescale',
    stars: 4.5,
    icon: <BarChart className="h-6 w-6 text-cyan-500" />,
    color: '#00CED1'
  },
  {
    id: 'weaviate',
    name: 'Weaviate',
    description: 'Open-source vector database that stores both objects and vectors for cloud-native, ML-first applications.',
    category: 'Vector',
    provider: 'SeMI Technologies',
    stars: 4.4,
    icon: <Braces className="h-6 w-6 text-pink-500" />,
    color: '#FF69B4'
  },
];

const DatabaseSection = () => {
  const [activeCategory, setActiveCategory] = useState<DatabaseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDatabases, setFilteredDatabases] = useState(databases);
  const [activeDatabase, setActiveDatabase] = useState<string | null>('postgresql');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<'stars' | 'name'>('stars');

  const categories: DatabaseCategory[] = ['All', 'SQL', 'NoSQL', 'Vector', 'Time-Series', 'GraphDB'];

  // Filter databases based on active category and search query
  const filterDatabases = () => {
    let result = [...databases];
    
    if (activeCategory !== 'All') {
      result = result.filter(db => db.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(db => 
        db.name.toLowerCase().includes(query) || 
        db.description.toLowerCase().includes(query) || 
        db.provider.toLowerCase().includes(query)
      );
    }
    
    // Sort the results
    if (sortBy === 'stars') {
      result.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredDatabases(result);
    
    // Set the active database to the first result if the current active database is filtered out
    if (result.length > 0 && activeDatabase && !result.find(db => db.id === activeDatabase)) {
      setActiveDatabase(result[0].id);
    }
  };

  // Update filtered databases when category or search query changes
  useEffect(() => {
    filterDatabases();
  }, [activeCategory, searchQuery, sortBy]);

  const getActiveDbCode = () => {
    const db = databases.find(db => db.id === activeDatabase);
    return db?.code || '// No connection code example available for this database.';
  };

  const getActiveDbColor = () => {
    const db = databases.find(db => db.id === activeDatabase);
    return db?.color || '#3498db';
  };

  return (
    <section id="databases" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-transparent blur-3xl"
          animate={{ 
            opacity: [0.3, 0.7, 0.3], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-emerald-500/5 via-cyan-500/5 to-transparent blur-3xl"
          animate={{ 
            opacity: [0.4, 0.6, 0.4], 
            x: [0, -20, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
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
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-emerald-500/20 px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-blue-500/20">
            <Database className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              Data Integration
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 dark:from-white dark:to-white/60">
            Powerful Data Management
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect your AI pipelines to any database or data source. Seamlessly store, retrieve, and analyze your data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Featured database visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full h-[350px] flex items-center justify-center">
              <StepGlow 
                color={getActiveDbColor()} 
                size="lg"
                className="absolute"
              >
                <div className="h-32 w-32 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
                  {databases.find(db => db.id === activeDatabase)?.icon || 
                    <Database className="h-12 w-12 text-primary" />}
                </div>
              </StepGlow>
              
              {/* Connection lines */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute w-24 h-[1px] bg-gradient-to-r"
                    style={{
                      top: `${50 + 25 * Math.sin(i * Math.PI / 4)}%`,
                      left: `${50 + 25 * Math.cos(i * Math.PI / 4)}%`,
                      transform: `rotate(${i * 45}deg)`,
                      transformOrigin: 'left center',
                      backgroundImage: `linear-gradient(to right, transparent, ${getActiveDbColor()})`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.6 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />
                ))}
              </motion.div>
              
              {/* Feature badges */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {['Scalable', 'Fast', 'Reliable', 'Secure', 'Cloud-native'].map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="absolute bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm"
                    style={{
                      top: `${35 + 35 * Math.sin(i * Math.PI * 2 / 5)}%`,
                      left: `${35 + 35 * Math.cos(i * Math.PI * 2 / 5)}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                  >
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Database selection and code */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="neo-card overflow-hidden backdrop-blur-md bg-gradient-to-br from-background/60 to-background/40 border border-border/50">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Connect with a few lines of code</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
                      onClick={() => setSortBy('stars')}
                    >
                      <Star className={`h-4 w-4 mr-1 ${sortBy === 'stars' ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                      <span>Rating</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
                      onClick={() => setSortBy('name')}
                    >
                      <ArrowDown className={`h-4 w-4 mr-1 ${sortBy === 'name' ? 'text-primary' : ''}`} />
                      <span>Name</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex mb-4 justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    className="text-muted-foreground"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    <span>Filters</span>
                    {isFilterExpanded ? 
                      <ChevronRight className="h-4 w-4 ml-1 rotate-90 transition-transform" /> : 
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform" />
                    }
                  </Button>
                  
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search databases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 w-full sm:w-[250px] rounded-full"
                    />
                  </div>
                </div>
                
                {isFilterExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 py-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={activeCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveCategory(category)}
                          className="rounded-full"
                        >
                          {category === 'All' && <Boxes className="h-4 w-4 mr-1" />}
                          {category === 'SQL' && <Database className="h-4 w-4 mr-1" />}
                          {category === 'NoSQL' && <Layers className="h-4 w-4 mr-1" />}
                          {category === 'Vector' && <Hexagon className="h-4 w-4 mr-1" />}
                          {category === 'Time-Series' && <BarChart className="h-4 w-4 mr-1" />}
                          {category === 'GraphDB' && <Workflow className="h-4 w-4 mr-1" />}
                          <span>{category}</span>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {filteredDatabases.map(database => (
                    <motion.div
                      key={database.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card 
                        className={`h-full cursor-pointer border overflow-hidden transition-all duration-200
                                  ${activeDatabase === database.id 
                                    ? 'bg-gradient-to-br from-background/80 to-background/40 border-primary/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                                    : 'bg-background/50 hover:bg-background/70'}`}
                        onClick={() => setActiveDatabase(database.id)}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-full bg-${database.color}/10 border border-${database.color}/20`} style={{ backgroundColor: `${database.color}20` }}>
                              {database.icon}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium text-sm">
                                  {database.name}
                                </h3>
                                {database.new && (
                                  <Badge className="ml-2 bg-primary text-[10px] px-1 py-0">NEW</Badge>
                                )}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                                <span>{database.stars}</span>
                              </div>
                            </div>
                          </div>
                          
                          {activeDatabase === database.id && (
                            <div className="absolute top-2 right-2">
                              <ChevronRight className="h-4 w-4 text-primary animate-pulse" />
                            </div>
                          )}
                          
                          <Badge variant="outline" className="text-[10px] my-1">
                            {database.category}
                          </Badge>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="code-block text-xs md:text-sm bg-background/50 dark:bg-background/30 border border-border/50 rounded-lg p-4 overflow-auto max-h-[200px]">
                    <code className="text-foreground/90">{getActiveDbCode()}</code>
                  </pre>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="px-2 py-1 text-xs">Auto-scaling</Badge>
                    <Badge variant="outline" className="px-2 py-1 text-xs">Real-time sync</Badge>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-xs flex items-center gap-1 text-primary"
                  >
                    <Code className="h-3.5 w-3.5" />
                    <span>View Documentation</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Button 
            size="lg" 
            className="rounded-full shadow-glow"
          >
            Explore Database Options <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DatabaseSection;
