
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Circle, CheckCircle2, Zap } from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';
import { motion } from 'framer-motion';

const PipelineBuilder = () => {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'input', title: 'Text Input', x: 100, y: 150 },
    { id: 2, type: 'process', title: 'GPT-4', x: 350, y: 100 },
    { id: 3, type: 'process', title: 'Whisper', x: 350, y: 200 },
    { id: 4, type: 'process', title: 'DALL-E 3', x: 600, y: 150 },
    { id: 5, type: 'output', title: 'Image Output', x: 850, y: 150 },
  ]);

  const [edges, setEdges] = useState([
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [completedNodes, setCompletedNodes] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const runPipeline = () => {
    setIsRunning(true);
    setActiveNodeId(1);
    setCompletedNodes([]);
    setProgress(0);
    
    const executeNode = (nodeId: number, delay: number) => {
      return new Promise<void>((resolve) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
          setActiveNodeId(nodeId);
          
          // Animate progress from 0 to 100%
          let startTime = Date.now();
          const duration = 1000; // 1 second
          
          const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(100, (elapsed / duration) * 100);
            setProgress(newProgress);
            
            if (newProgress < 100) {
              animationFrameRef.current = requestAnimationFrame(updateProgress);
            } else {
              setCompletedNodes((prev) => [...prev, nodeId]);
              resolve();
            }
          };
          
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }, delay);
      });
    };
    
    const simulateExecution = async () => {
      await executeNode(1, 0);
      
      await Promise.all([
        executeNode(2, 1000),
        executeNode(3, 1500)
      ]);
      
      await executeNode(4, 1500);
      await executeNode(5, 1000);
      
      setActiveNodeId(null);
      setTimeout(() => {
        setIsRunning(false);
        setProgress(0);
      }, 1000);
    };
    
    simulateExecution();
  };

  const nodeVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
    active: { 
      scale: 1.1, 
      boxShadow: "0 0 15px rgba(66, 153, 225, 0.7)",
      transition: { duration: 0.3 }
    },
    completed: {
      borderColor: "rgb(34, 197, 94)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="pipeline" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Visualize Your Pipeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag and drop models to build your custom AI workflow. Connect components to create powerful processing pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-[460px] neo-card p-6 relative shadow-glow"
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Pipeline nodes */}
              {nodes.map((node) => (
                <motion.div 
                  key={node.id}
                  className={`absolute rounded-lg shadow-md p-4 min-w-[120px] text-center cursor-move select-none
                    ${node.type === 'input' ? 'glass dark:glass-light border-primary/50' : 
                      node.type === 'process' ? 'glass dark:glass-light border-accent/50' : 
                      'glass dark:glass-light border-secondary/50'}
                    ${completedNodes.includes(node.id) ? 'border-green-500/70' : ''}
                  `}
                  style={{ left: node.x, top: node.y }}
                  variants={nodeVariants}
                  initial="initial"
                  animate={
                    activeNodeId === node.id 
                      ? "active" 
                      : completedNodes.includes(node.id) 
                        ? "completed" 
                        : "animate"
                  }
                  whileHover="hover"
                  whileTap="tap"
                >
                  {node.title}
                  {activeNodeId === node.id && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                  {completedNodes.includes(node.id) && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-0.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Edges between nodes */}
              <svg className="absolute inset-0 pointer-events-none">
                {edges.map((edge, index) => {
                  const source = nodes.find(n => n.id === edge.source);
                  const target = nodes.find(n => n.id === edge.target);
                  
                  if (!source || !target) return null;
                  
                  // Calculate edge path
                  const sourceX = source.x + 60;
                  const sourceY = source.y + 25;
                  const targetX = target.x;
                  const targetY = target.y + 25;
                  
                  // Check if this edge is active in the animation
                  const isActive = 
                    activeNodeId === edge.target && 
                    completedNodes.includes(edge.source);
                    
                  // Check if edge is completed (both nodes are completed)
                  const isCompleted = 
                    completedNodes.includes(edge.source) && 
                    completedNodes.includes(edge.target);
                  
                  return (
                    <g key={index}>
                      <motion.path 
                        d={`M${sourceX},${sourceY} C${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity={isActive || isCompleted ? "1" : "0.3"}
                        strokeWidth={isActive ? "3" : "2"}
                        className={isCompleted ? "stroke-green-500" : isActive ? "stroke-primary animate-pulse" : "stroke-primary"}
                        strokeDasharray={isActive ? "5,5" : ""}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                      <circle 
                        cx={targetX} 
                        cy={targetY} 
                        r="3" 
                        className={isCompleted ? "fill-green-500" : "fill-primary"}
                      />
                      
                      {isActive && (
                        <motion.circle 
                          animate={{
                            cx: [sourceX, targetX],
                            cy: [sourceY, targetY]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          r="4" 
                          className="fill-primary"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <motion.div 
              className="absolute bottom-4 right-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                onClick={runPipeline} 
                disabled={isRunning}
                className="rounded-full shadow-glow"
              >
                {isRunning ? 'Running...' : 'Run Pipeline'} 
                {isRunning ? (
                  <Circle className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Zap className="ml-2 h-4 w-4" />
                  </motion.div>
                )}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <CodeViewer />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Button size="lg" className="rounded-full px-8">
            Build Your Pipeline <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PipelineBuilder;
