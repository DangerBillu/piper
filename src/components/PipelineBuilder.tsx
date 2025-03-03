
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';

const PipelineBuilder = () => {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'input', title: 'User Input', x: 100, y: 150 },
    { id: 2, type: 'process', title: 'GPT-4', x: 350, y: 150 },
    { id: 3, type: 'output', title: 'Result', x: 600, y: 150 },
  ]);

  const [edges, setEdges] = useState([
    { source: 1, target: 2 },
    { source: 2, target: 3 },
  ]);

  return (
    <section id="pipeline" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visualize Your Pipeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag and drop models to build your custom AI workflow. Connect components to create powerful processing pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="h-[400px] neo-card p-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Pipeline nodes */}
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  className={`absolute rounded-lg shadow-md p-4 min-w-[100px] text-center cursor-move select-none
                    ${node.type === 'input' ? 'glass dark:glass-light border-primary/50' : 
                      node.type === 'process' ? 'glass dark:glass-light border-accent/50' : 
                      'glass dark:glass-light border-secondary/50'}
                  `}
                  style={{ left: node.x, top: node.y }}
                >
                  {node.title}
                </div>
              ))}

              {/* Edges between nodes */}
              <svg className="absolute inset-0 pointer-events-none">
                {edges.map((edge, index) => {
                  const source = nodes.find(n => n.id === edge.source);
                  const target = nodes.find(n => n.id === edge.target);
                  
                  if (!source || !target) return null;
                  
                  const sourceX = source.x + 50;
                  const sourceY = source.y + 25;
                  const targetX = target.x;
                  const targetY = target.y + 25;
                  
                  return (
                    <g key={index}>
                      <path 
                        d={`M${sourceX},${sourceY} C${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`}
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.3"
                        strokeWidth="2"
                        className="stroke-primary"
                      />
                      <circle cx={targetX} cy={targetY} r="3" className="fill-primary" />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-muted-foreground">
                <p>This is a simplified preview.</p>
                <p>Full drag-and-drop functionality coming soon.</p>
              </div>
            </div>
          </div>

          <div>
            <CodeViewer />
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" className="rounded-full px-8">
            Try it Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PipelineBuilder;
