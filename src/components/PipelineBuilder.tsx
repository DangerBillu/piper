
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Circle, CheckCircle2 } from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runPipeline = () => {
    setIsRunning(true);
    setActiveNodeId(1);
    setCompletedNodes([]);
    
    const executeNode = (nodeId: number, delay: number) => {
      return new Promise<void>((resolve) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
          setActiveNodeId(nodeId);
          
          timeoutRef.current = setTimeout(() => {
            setCompletedNodes((prev) => [...prev, nodeId]);
            resolve();
          }, 1000);
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
      setTimeout(() => setIsRunning(false), 1000);
    };
    
    simulateExecution();
  };

  return (
    <section id="pipeline" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Visualize Your Pipeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag and drop models to build your custom AI workflow. Connect components to create powerful processing pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="h-[460px] neo-card p-6 relative shadow-glow animate-slide-up">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Pipeline nodes */}
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  className={`absolute rounded-lg shadow-md p-4 min-w-[120px] text-center cursor-move select-none transition-all duration-300
                    ${node.type === 'input' ? 'glass dark:glass-light border-primary/50' : 
                      node.type === 'process' ? 'glass dark:glass-light border-accent/50' : 
                      'glass dark:glass-light border-secondary/50'}
                    ${activeNodeId === node.id ? 'scale-110 shadow-glow border-primary' : ''}
                    ${completedNodes.includes(node.id) ? 'border-green-500/70' : ''}
                  `}
                  style={{ left: node.x, top: node.y }}
                >
                  {node.title}
                  {completedNodes.includes(node.id) && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
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
                      <path 
                        d={`M${sourceX},${sourceY} C${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity={isActive || isCompleted ? "1" : "0.3"}
                        strokeWidth={isActive ? "3" : "2"}
                        className={isCompleted ? "stroke-green-500" : isActive ? "stroke-primary animate-pulse" : "stroke-primary"}
                        strokeDasharray={isActive ? "5,5" : ""}
                        strokeLinecap="round"
                      />
                      <circle 
                        cx={targetX} 
                        cy={targetY} 
                        r="3" 
                        className={isCompleted ? "fill-green-500" : "fill-primary"}
                      />
                      
                      {isActive && (
                        <circle 
                          cx={sourceX + (targetX - sourceX) * 0.5} 
                          cy={sourceY + (targetY - sourceY) * 0.5} 
                          r="4" 
                          className="fill-primary animate-pulse"
                        >
                          <animate 
                            attributeName="cx" 
                            from={sourceX} 
                            to={targetX} 
                            dur="1s" 
                            repeatCount="indefinite"
                          />
                          <animate 
                            attributeName="cy" 
                            from={sourceY} 
                            to={targetY} 
                            dur="1s" 
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="absolute bottom-4 right-4">
              <Button 
                size="sm" 
                onClick={runPipeline} 
                disabled={isRunning}
                className="rounded-full shadow-glow"
              >
                {isRunning ? 'Running...' : 'Run Pipeline'} 
                {isRunning ? <Circle className="ml-2 h-4 w-4 animate-spin" /> : <Play className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="animate-slide-up animation-delay-200">
            <CodeViewer />
          </div>
        </div>

        <div className="mt-10 text-center animate-slide-up animation-delay-300">
          <Button size="lg" className="rounded-full px-8">
            Build Your Pipeline <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PipelineBuilder;
