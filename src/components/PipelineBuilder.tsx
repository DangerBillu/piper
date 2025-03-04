
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Play, Circle, CheckCircle2, Zap, 
  Box, ChevronDown, AlignJustify, Settings, 
  ChevronUp, Terminal, Bot, Image as ImageIcon, FileText,
  MoveHorizontal
} from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface NodeData {
  id: number;
  type: 'input' | 'process' | 'output';
  title: string;
  subtitle?: string;
  expanded?: boolean;
  position: { x: number; y: number };
  config?: {
    [key: string]: string | number | boolean;
  }
}

interface EdgeData {
  id: string;
  source: number;
  target: number;
  animated?: boolean;
  color?: string;
}

const PipelineBuilder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes] = useState<NodeData[]>([
    { 
      id: 1, 
      type: 'input', 
      title: 'Text Input', 
      subtitle: 'User prompt',
      expanded: false,
      position: { x: 30, y: 180 },
      config: {
        'mode': 'streaming',
        'max_tokens': 1000
      }
    },
    { 
      id: 2, 
      type: 'process', 
      title: 'Attribute Capture', 
      subtitle: 'Extract key details',
      expanded: false,
      position: { x: 250, y: 120 },
      config: {
        'attribute': 'geometry',
        'vector': 'point',
        'dimension': 3
      }
    },
    { 
      id: 3, 
      type: 'process', 
      title: 'Position Setting', 
      subtitle: 'Coordinate mapping',
      expanded: false,
      position: { x: 450, y: 70 },
      config: {
        'x': 1,
        'y': 0,
        'z': 0
      }
    },
    { 
      id: 4, 
      type: 'process', 
      title: 'Instance', 
      subtitle: 'Points configuration',
      expanded: false,
      position: { x: 600, y: 150 },
      config: {
        'count': 120,
        'selection': 'all',
        'rotation': '0°'
      }
    },
    { 
      id: 5, 
      type: 'process', 
      title: 'Geometry Join', 
      subtitle: 'Merge geometries',
      expanded: false,
      position: { x: 750, y: 220 },
      config: {
        'mode': 'union',
        'normalize': true
      }
    },
    { 
      id: 6, 
      type: 'output', 
      title: 'Output', 
      subtitle: 'Final result',
      expanded: false,
      position: { x: 900, y: 140 },
      config: {
        'format': 'glb',
        'compress': true
      }
    }
  ]);

  const [edges, setEdges] = useState<EdgeData[]>([
    { id: 'e1-2', source: 1, target: 2, color: 'rgba(66, 153, 225, 0.7)' },
    { id: 'e2-3', source: 2, target: 3, color: 'rgba(66, 153, 225, 0.7)' },
    { id: 'e3-4', source: 3, target: 4, color: 'rgba(39, 174, 96, 0.7)' },
    { id: 'e2-4', source: 2, target: 4, color: 'rgba(66, 153, 225, 0.7)' },
    { id: 'e4-5', source: 4, target: 5, color: 'rgba(39, 174, 96, 0.7)' },
    { id: 'e5-6', source: 5, target: 6, color: 'rgba(39, 174, 96, 0.7)' },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [completedNodes, setCompletedNodes] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [draggingNodeId, setDraggingNodeId] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Get container dimensions
  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setContainerSize({ width: rect.width, height: rect.height });
        }
      };
      
      updateSize();
      window.addEventListener('resize', updateSize);
      
      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }
  }, []);

  // Position nodes to fit within container if they're outside
  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      setNodes(prevNodes => 
        prevNodes.map(node => {
          const nodeWidth = node.expanded ? 220 : 160;
          const nodeHeight = 60;
          
          // Ensure node is within container bounds
          const x = Math.max(0, Math.min(node.position.x, containerSize.width - nodeWidth));
          const y = Math.max(0, Math.min(node.position.y, containerSize.height - nodeHeight));
          
          return {
            ...node,
            position: { x, y }
          };
        })
      );
    }
  }, [containerSize]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const toggleNodeExpand = (nodeId: number) => {
    setNodes(nodes.map(node => 
      node.id === nodeId 
        ? { ...node, expanded: !node.expanded } 
        : node
    ));
  };

  const updateNodePosition = (nodeId: number, newPosition: { x: number; y: number }) => {
    if (containerSize.width <= 0 || containerSize.height <= 0) return;
    
    const nodeWidth = nodes.find(n => n.id === nodeId)?.expanded ? 220 : 160;
    const nodeHeight = 60;
    
    // Constrain to container bounds
    const x = Math.max(0, Math.min(newPosition.x, containerSize.width - nodeWidth));
    const y = Math.max(0, Math.min(newPosition.y, containerSize.height - nodeHeight));
    
    setNodes(nodes.map(node => 
      node.id === nodeId 
        ? { ...node, position: { x, y } } 
        : node
    ));
  };

  const handleDragStart = (nodeId: number) => {
    setDraggingNodeId(nodeId);
  };

  const handleDragEnd = () => {
    setDraggingNodeId(null);
  };

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
          
          let startTime = Date.now();
          const duration = 1000;
          
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
    
    const simulatePath = async () => {
      await executeNode(1, 0);
      await executeNode(2, 700);
      await executeNode(3, 700);
      await executeNode(4, 900);
      await executeNode(5, 800);
      await executeNode(6, 700);
      
      setActiveNodeId(null);
      setTimeout(() => {
        setIsRunning(false);
        setProgress(0);
      }, 1000);
    };
    
    simulatePath();
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'input':
        return <FileText className="h-4 w-4" />;
      case 'process':
        return <Settings className="h-4 w-4" />;
      case 'output':
        return <Terminal className="h-4 w-4" />;
      default:
        return <Box className="h-4 w-4" />;
    }
  };

  const nodeColorClass = (type: string) => {
    switch (type) {
      case 'input':
        return 'border-blue-500/30 bg-blue-500/5';
      case 'process':
        return 'border-violet-500/30 bg-violet-500/5';
      case 'output':
        return 'border-emerald-500/30 bg-emerald-500/5';
      default:
        return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const nodeHeaderColor = (type: string) => {
    switch (type) {
      case 'input':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'process':
        return 'bg-violet-500/20 text-violet-700 dark:text-violet-300';
      case 'output':
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const nodeHandleColor = (type: string) => {
    switch (type) {
      case 'input':
        return 'bg-blue-500';
      case 'process':
        return 'bg-violet-500';
      case 'output':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
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
            className="h-[500px] neo-card p-6 relative shadow-glow bg-gradient-to-br from-background to-background/40 backdrop-blur-sm overflow-hidden"
            ref={containerRef}
          >
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(125,125,125,0.1) 1px, transparent 1px)', 
              backgroundSize: '20px 20px',
              opacity: 0.3
            }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>
                {edges.map((edge) => {
                  const source = nodes.find(n => n.id === edge.source);
                  const target = nodes.find(n => n.id === edge.target);
                  
                  if (!source || !target) return null;
                  
                  // Get width of source node
                  const sourceWidth = source.expanded ? 220 : 160;
                  
                  // Calculate connection points
                  const sourceX = source.position.x + sourceWidth;
                  const sourceY = source.position.y + 25;
                  const targetX = target.position.x;
                  const targetY = target.position.y + 25;
                  
                  const controlPoint1X = sourceX + 50;
                  const controlPoint1Y = sourceY;
                  const controlPoint2X = targetX - 50;
                  const controlPoint2Y = targetY;
                  
                  const isActive = activeNodeId === edge.target && completedNodes.includes(edge.source);
                  const isCompleted = completedNodes.includes(edge.source) && completedNodes.includes(edge.target);
                  
                  const edgeColor = isCompleted 
                    ? 'rgb(34, 197, 94)' 
                    : (isActive ? 'currentColor' : (edge.color || 'rgba(125, 125, 125, 0.7)'));
                  
                  return (
                    <g key={edge.id}>
                      <motion.path 
                        d={`M${sourceX},${sourceY} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${targetX},${targetY}`}
                        fill="none"
                        stroke={edgeColor}
                        strokeOpacity={isActive || isCompleted ? "1" : "0.6"}
                        strokeWidth={isActive ? "3" : "2"}
                        className={isActive ? "animate-pulse" : ""}
                        strokeDasharray={isActive ? "5,5" : ""}
                        strokeLinecap="round"
                        markerEnd="url(#arrow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
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

              {nodes.map((node) => {
                const isActive = activeNodeId === node.id;
                const isCompleted = completedNodes.includes(node.id);
                const isDragging = draggingNodeId === node.id;
                const nodeWidth = node.expanded ? 220 : 160;
                
                return (
                  <motion.div 
                    key={node.id}
                    className={`absolute rounded-md shadow-lg backdrop-blur-sm border overflow-hidden cursor-move
                      ${nodeColorClass(node.type)}
                      ${isCompleted ? 'border-green-500/70' : ''}
                      ${isActive ? 'ring-2 ring-primary/70' : ''}
                      ${isDragging ? 'z-50 shadow-xl ring-2 ring-primary/40' : ''}
                    `}
                    style={{ 
                      left: node.position.x, 
                      top: node.position.y,
                      width: nodeWidth,
                      transition: isDragging ? 'none' : 'width 0.3s ease'
                    }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => handleDragStart(node.id)}
                    onDragEnd={handleDragEnd}
                    onDrag={(_, info) => {
                      if (containerRef.current) {
                        const x = node.position.x + info.delta.x;
                        const y = node.position.y + info.delta.y;
                        updateNodePosition(node.id, { x, y });
                      }
                    }}
                  >
                    <div className={`text-xs font-medium p-2 flex justify-between items-center ${nodeHeaderColor(node.type)}`}>
                      <div className="flex items-center gap-1.5">
                        {getNodeIcon(node.type)}
                        <span>{node.title}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <motion.div
                          className="p-0.5 rounded hover:bg-black/10 mr-1"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MoveHorizontal size={12} className="opacity-60" />
                        </motion.div>
                        
                        <motion.button
                          onClick={() => toggleNodeExpand(node.id)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-0.5 rounded hover:bg-black/10"
                        >
                          {node.expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="p-2 text-xs">
                      <div className="text-muted-foreground mb-1">{node.subtitle}</div>
                      
                      <AnimatePresence>
                        {node.expanded && node.config && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 overflow-hidden"
                          >
                            <div className="space-y-1.5 pt-1 border-t border-foreground/10">
                              {Object.entries(node.config).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <span className="font-mono bg-foreground/5 px-1 rounded text-[10px]">{value.toString()}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className={`absolute w-3 h-3 rounded-full ${nodeHandleColor(node.type)} left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
                    
                    {node.type !== 'output' && (
                      <div className={`absolute w-3 h-3 rounded-full ${nodeHandleColor(node.type)} right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2`} />
                    )}
                    
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        ></motion.div>
                      </div>
                    )}
                    
                    {isCompleted && (
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
                );
              })}
            </div>

            <div className="absolute top-4 right-4 space-x-2 flex">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                Nodes: {nodes.length}
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                Connections: {edges.length}
              </Badge>
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
                {isRunning ? 'Running Pipeline...' : 'Run Pipeline'} 
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
            <div className="max-h-[500px] overflow-auto custom-scrollbar">
              <CodeViewer />
            </div>
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
