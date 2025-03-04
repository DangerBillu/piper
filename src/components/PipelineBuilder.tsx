import { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Play, Circle, CheckCircle2, Zap, 
  Box, ChevronDown, AlignJustify, Settings, 
  ChevronUp, Terminal, Bot, Image as ImageIcon, FileText,
  MoveHorizontal, Save, Grid, Layers, Workflow, Cpu
} from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type NodeType = {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  collapsed: boolean;
  inputs: NodeInput[];
  outputs: NodeOutput[];
  color: string;
}

type NodeInput = {
  id: string;
  name: string;
  type: "geometry" | "attribute" | "position" | "value" | "selection" | "mesh" | "points" | "instance";
  value?: string | number;
  connected?: boolean;
}

type NodeOutput = {
  id: string;
  name: string;
  type: "geometry" | "attribute" | "position" | "value" | "selection" | "mesh" | "points" | "instance";
  connected?: boolean;
}

type ConnectionType = {
  id: string;
  from: { nodeId: string; outputId: string };
  to: { nodeId: string; inputId: string };
  path: string;
  color: string;
}

const PipelineBuilder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes] = useState<NodeType[]>([
    {
      id: "node1",
      type: "grid",
      title: "Grid",
      x: 50,
      y: 50,
      collapsed: false,
      color: "#4ade80",
      inputs: [
        { id: "n1-i1", name: "Size X", type: "value", value: "1 m" },
        { id: "n1-i2", name: "Size Y", type: "value", value: "1 m" },
        { id: "n1-i3", name: "Vertices X", type: "value", value: "10" },
        { id: "n1-i4", name: "Vertices Y", type: "value", value: "10" },
      ],
      outputs: [
        { id: "n1-o1", name: "Mesh", type: "mesh", connected: true },
        { id: "n1-o2", name: "Geometry", type: "geometry", connected: true },
        { id: "n1-o3", name: "Position", type: "position", connected: true },
      ],
    },
    {
      id: "node2",
      type: "capture",
      title: "Capture Attribute",
      x: 300,
      y: 80,
      collapsed: false,
      color: "#3b82f6",
      inputs: [
        { id: "n2-i1", name: "Geometry", type: "geometry", connected: true },
        { id: "n2-i2", name: "Attribute", type: "attribute", value: "Vector" },
        { id: "n2-i3", name: "Value", type: "value", value: "Point" },
      ],
      outputs: [
        { id: "n2-o1", name: "Geometry", type: "geometry", connected: true },
        { id: "n2-o2", name: "Value", type: "value", connected: true },
      ],
    },
    {
      id: "node3",
      type: "position",
      title: "Set Position",
      x: 550,
      y: 50,
      collapsed: false,
      color: "#4ade80",
      inputs: [
        { id: "n3-i1", name: "Geometry", type: "geometry", connected: true },
        { id: "n3-i2", name: "Selection", type: "selection" },
        { id: "n3-i3", name: "Position", type: "position", connected: true },
        { id: "n3-i4", name: "Offset X", type: "value", value: "1 m" },
        { id: "n3-i5", name: "Offset Y", type: "value", value: "0 m" },
        { id: "n3-i6", name: "Offset Z", type: "value", value: "0 m" },
      ],
      outputs: [{ id: "n3-o1", name: "Geometry", type: "geometry", connected: true }],
    },
    {
      id: "node4",
      type: "instance",
      title: "Instance on Points",
      x: 750,
      y: 150,
      collapsed: false,
      color: "#4ade80",
      inputs: [
        { id: "n4-i1", name: "Points", type: "points", connected: true },
        { id: "n4-i2", name: "Instance", type: "instance" },
        { id: "n4-i3", name: "Selection", type: "selection" },
        { id: "n4-i4", name: "Pick Instance", type: "value", value: "0" },
        { id: "n4-i5", name: "Instance Index", type: "value" },
        { id: "n4-i6", name: "Rotation X", type: "value", value: "0°" },
        { id: "n4-i7", name: "Rotation Y", type: "value", value: "0°" },
        { id: "n4-i8", name: "Rotation Z", type: "value", value: "0°" },
        { id: "n4-i9", name: "Scale X", type: "value", value: "0.020" },
        { id: "n4-i10", name: "Scale Y", type: "value", value: "0.020" },
        { id: "n4-i11", name: "Scale Z", type: "value", value: "0.020" },
      ],
      outputs: [{ id: "n4-o1", name: "Instances", type: "instance", connected: true }],
    },
    {
      id: "node5",
      type: "cone",
      title: "Cone",
      x: 550,
      y: 350,
      collapsed: false,
      color: "#4ade80",
      inputs: [
        { id: "n5-i1", name: "Mesh", type: "mesh", connected: true },
        { id: "n5-i2", name: "Top", type: "value" },
        { id: "n5-i3", name: "Bottom", type: "value" },
        { id: "n5-i4", name: "Side", type: "value" },
        { id: "n5-i5", name: "Fill Type", type: "value", value: "N-Gon" },
        { id: "n5-i6", name: "Vertices", type: "value", value: "32" },
        { id: "n5-i7", name: "Side Segment", type: "value", value: "1" },
        { id: "n5-i8", name: "Fill Segments", type: "value", value: "1" },
        { id: "n5-i9", name: "Radius Top", type: "value", value: "0 m" },
        { id: "n5-i10", name: "Radius Bottom", type: "value", value: "1 m" },
        { id: "n5-i11", name: "Depth", type: "value", value: "2 m" },
      ],
      outputs: [{ id: "n5-o1", name: "Mesh", type: "mesh", connected: true }],
    },
    {
      id: "node6",
      type: "join",
      title: "Join Geometry",
      x: 1000,
      y: 220,
      collapsed: false,
      color: "#4ade80",
      inputs: [{ id: "n6-i1", name: "Geometry", type: "geometry", connected: true }],
      outputs: [{ id: "n6-o1", name: "Geometry", type: "geometry", connected: true }],
    },
    {
      id: "node7",
      type: "output",
      title: "Group Output",
      x: 1200,
      y: 220,
      collapsed: false,
      color: "#6b7280",
      inputs: [{ id: "n7-i1", name: "Geometry", type: "geometry", connected: true }],
      outputs: [],
    },
  ]);

  const [connections, setConnections] = useState<ConnectionType[]>([
    {
      id: "conn1",
      from: { nodeId: "node1", outputId: "n1-o2" },
      to: { nodeId: "node2", inputId: "n2-i1" },
      path: "",
      color: "#4ade80",
    },
    {
      id: "conn2",
      from: { nodeId: "node2", outputId: "n2-o1" },
      to: { nodeId: "node3", inputId: "n3-i1" },
      path: "",
      color: "#4ade80",
    },
    {
      id: "conn3",
      from: { nodeId: "node3", outputId: "n3-o1" },
      to: { nodeId: "node4", inputId: "n4-i1" },
      path: "",
      color: "#4ade80",
    },
    {
      id: "conn4",
      from: { nodeId: "node1", outputId: "n1-o1" },
      to: { nodeId: "node5", inputId: "n5-i1" },
      path: "",
      color: "#4ade80",
    },
    {
      id: "conn5",
      from: { nodeId: "node4", outputId: "n4-o1" },
      to: { nodeId: "node6", inputId: "n6-i1" },
      path: "",
      color: "#4ade80",
    },
    {
      id: "conn6",
      from: { nodeId: "node6", outputId: "n6-o1" },
      to: { nodeId: "node7", inputId: "n7-i1" },
      path: "",
      color: "#4ade80",
    },
  ]);

  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const updateConnectionPaths = useCallback(() => {
    setConnections((prev) =>
      prev.map((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from.nodeId);
        const toNode = nodes.find((n) => n.id === conn.to.nodeId);

        if (!fromNode || !toNode) return conn;

        const fromOutput = fromNode.outputs.find((o) => o.id === conn.from.outputId);
        const toInput = toNode.inputs.find((i) => i.id === conn.to.inputId);

        if (!fromOutput || !toInput) return conn;

        const fromIndex = fromNode.outputs.indexOf(fromOutput);
        const toIndex = toNode.inputs.indexOf(toInput);

        const fromNodeHeight = fromNode.collapsed ? 40 : 40 + (fromNode.inputs.length + fromNode.outputs.length) * 30;
        const toNodeHeight = toNode.collapsed ? 40 : 40 + (toNode.inputs.length + toNode.outputs.length) * 30;

        const fromX = fromNode.x + 250;
        const fromY = fromNode.y + 40 + (fromNode.collapsed ? 0 : (fromNode.inputs.length + fromIndex) * 30);

        const toX = toNode.x;
        const toY = toNode.y + 40 + (toNode.collapsed ? 0 : toIndex * 30);

        const dx = Math.abs(toX - fromX);
        const controlX1 = fromX + Math.min(dx * 0.5, 100);
        const controlX2 = toX - Math.min(dx * 0.5, 100);

        const path = `M${fromX},${fromY} C${controlX1},${fromY} ${controlX2},${toY} ${toX},${toY}`;

        return { ...conn, path };
      })
    );
  }, [nodes]);

  useEffect(() => {
    updateConnectionPaths();
  }, [updateConnectionPaths]);

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (e.button !== 0) return;

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setDraggingNode(nodeId);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const dx = (e.clientX - panStart.x) / scale;
      const dy = (e.clientY - panStart.y) / scale;

      setPan((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      setPanStart({
        x: e.clientX,
        y: e.clientY,
      });
      return;
    }

    if (!draggingNode) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = (e.clientX - containerRect.left) / scale - dragOffset.x - pan.x;
    const y = (e.clientY - containerRect.top) / scale - dragOffset.y - pan.y;

    setNodes(nodes.map((node) => (node.id === draggingNode ? { ...node, x, y } : node)));
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
    setIsPanning(false);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * delta, 0.1), 2);

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const mouseX = (e.clientX - containerRect.left) / scale;
    const mouseY = (e.clientY - containerRect.top) / scale;

    const newPanX = pan.x - (mouseX - pan.x) * (delta - 1);
    const newPanY = pan.y - (mouseY - pan.y) * (delta - 1);

    setScale(newScale);
    setPan({ x: newPanX, y: newPanY });
  };

  const toggleNodeCollapse = (nodeId: string) => {
    setNodes(nodes.map((node) => (node.id === nodeId ? { ...node, collapsed: !node.collapsed } : node)));
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "grid":
        return <Grid className="h-4 w-4" />;
      case "capture":
        return <FileText className="h-4 w-4" />;
      case "position":
        return <Box className="h-4 w-4" />;
      case "instance":
        return <Layers className="h-4 w-4" />;
      case "cone":
        return <Workflow className="h-4 w-4" />;
      case "join":
        return <Cpu className="h-4 w-4" />;
      case "output":
        return <Terminal className="h-4 w-4" />;
      default:
        return <Box className="h-4 w-4" />;
    }
  };

  const getInputColor = (type: string) => {
    switch (type) {
      case "geometry":
        return "#4ade80";
      case "mesh":
        return "#4ade80";
      case "points":
        return "#4ade80";
      case "instance":
        return "#4ade80";
      case "position":
        return "#3b82f6";
      case "selection":
        return "#a855f7";
      case "attribute":
        return "#3b82f6";
      case "value":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const runPipeline = () => {
    setIsRunning(true);
    setActiveNodeId("node1");
    setCompletedNodes([]);
    setProgress(0);
    
    const executeNode = (nodeId: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setActiveNodeId(nodeId);
          
          let startTime = Date.now();
          const duration = 1000;
          
          const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(100, (elapsed / duration) * 100);
            setProgress(newProgress);
            
            if (newProgress < 100) {
              requestAnimationFrame(updateProgress);
            } else {
              setCompletedNodes((prev) => [...prev, nodeId]);
              resolve();
            }
          };
          
          requestAnimationFrame(updateProgress);
        }, delay);
      });
    };
    
    const simulatePath = async () => {
      await executeNode("node1", 0);
      await executeNode("node2", 700);
      await executeNode("node3", 700);
      await executeNode("node4", 900);
      await executeNode("node5", 800);
      await executeNode("node6", 700);
      await executeNode("node7", 700);
      
      setActiveNodeId(null);
      setTimeout(() => {
        setIsRunning(false);
        setProgress(0);
      }, 1000);
    };
    
    simulatePath();
  };

  return (
    <section id="pipeline" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visual Pipeline Builder</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect models to create powerful processing pipelines in minutes, not days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-[450px] neo-card relative shadow-glow bg-gradient-to-br from-background to-background/40 backdrop-blur-sm overflow-hidden lg:col-span-3"
          >
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Pipeline Editor</h3>
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  onClick={runPipeline}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <Circle className="h-4 w-4 mr-1 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div
              ref={containerRef}
              className="relative h-[calc(100%-49px)] overflow-hidden bg-black/90 rounded-b-lg"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                  backgroundSize: `${20 * scale}px ${20 * scale}px`,
                  backgroundPosition: `${pan.x * scale}px ${pan.y * scale}px`,
                }}
              />

              <div
                className="absolute inset-0 transform-gpu"
                style={{
                  transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: "0 0",
                }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {connections.map((conn) => {
                    const isActive = activeNodeId === conn.to.nodeId && completedNodes.includes(conn.from.nodeId);
                    const isCompleted = completedNodes.includes(conn.from.nodeId) && completedNodes.includes(conn.to.nodeId);
                    
                    return (
                      <g key={conn.id}>
                        <path 
                          d={conn.path} 
                          fill="none" 
                          stroke={isCompleted ? "#22c55e" : (isActive ? "#3b82f6" : conn.color)} 
                          strokeWidth={isActive ? "3" : "2"} 
                          className={`opacity-70 ${isActive ? "animate-pulse" : ""}`}
                        />
                        <path
                          d={conn.path}
                          fill="none"
                          stroke={isCompleted ? "#22c55e" : (isActive ? "#3b82f6" : conn.color)}
                          strokeWidth="1"
                          strokeDasharray="4 2"
                          className="opacity-50"
                        />
                        
                        {isActive && (
                          <motion.circle 
                            cx="0"
                            cy="0"
                            r="4" 
                            fill="#3b82f6"
                            className="glow-effect"
                            filter="url(#glow)"
                            animate={{
                              offsetDistance: ['0%', '100%']
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            style={{
                              offsetPath: `path("${conn.path}")`,
                              offsetRotate: "0deg"
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                  
                  <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                </svg>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                {nodes.map((node) => {
                  const isActive = activeNodeId === node.id;
                  const isCompleted = completedNodes.includes(node.id);
                  
                  return (
                    <motion.div
                      key={node.id}
                      className={`absolute pipeline-node cursor-move bg-black/90 border rounded-md shadow-lg w-[250px] overflow-hidden ${
                        draggingNode === node.id ? "z-10 shadow-xl" : "z-0"
                      } ${isActive ? "ring-2 ring-primary/70" : ""} ${isCompleted ? "border-green-500/70" : `border-${node.color === "#4ade80" ? "emerald" : node.color === "#3b82f6" ? "blue" : "gray"}-500/50`}`}
                      style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      onMouseDown={(e) => handleMouseDown(e, node.id)}
                    >
                      <div
                        className="p-2 flex justify-between items-center cursor-pointer"
                        style={{ backgroundColor: `${node.color}20` }}
                        onClick={() => toggleNodeCollapse(node.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-sm flex items-center justify-center"
                            style={{ backgroundColor: node.color }}
                          >
                            {getNodeIcon(node.type)}
                          </div>
                          <span className="font-medium text-sm">{node.title}</span>
                        </div>
                        <button className="text-foreground/50 hover:text-foreground">
                          {node.collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </button>
                      </div>

                      {!node.collapsed && (
                        <div className="p-2 space-y-2">
                          {node.inputs.map((input, idx) => (
                            <div key={input.id} className="flex items-center gap-2 text-xs">
                              <div
                                className="w-3 h-3 rounded-full cursor-pointer"
                                style={{ backgroundColor: getInputColor(input.type) }}
                              />
                              <span className="text-foreground/70 w-24 truncate">{input.name}</span>
                              {input.value && (
                                <Input
                                  value={input.value.toString()}
                                  className="h-6 text-xs bg-black/50 border-gray-700"
                                />
                              )}
                            </div>
                          ))}

                          {node.outputs.map((output, idx) => (
                            <div key={output.id} className="flex items-center justify-between gap-2 text-xs">
                              <div className="flex-1" />
                              <span className="text-foreground/70 text-right w-24 truncate">{output.name}</span>
                              <div
                                className="w-3 h-3 rounded-full cursor-pointer"
                                style={{ backgroundColor: getInputColor(output.type) }}
                              />
                            </div>
                          ))}
                        </div>
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

              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-black/50 border-gray-700 text-white"
                  onClick={() => setScale((prev) => Math.min(prev * 1.2, 2))}
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-black/50 border-gray-700 text-white"
                  onClick={() => setScale((prev) => Math.max(prev * 0.8, 0.1))}
                >
                  -
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-black/50 border-gray-700 text-white"
                  onClick={() => {
                    setScale(1);
                    setPan({ x: 0, y: 0 });
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden h-full">
              <div className="p-4 h-full flex flex-col">
                <h3 className="font-medium mb-3">Code Output</h3>
                <div className="flex-1 overflow-auto custom-scrollbar bg-black/80 p-3 rounded-md">
                  <pre className="text-xs text-green-400 font-mono">
{`// Generated Pipeline Code
import { createPipeline } from '@piper/core';

const pipeline = createPipeline({
  nodes: ${nodes.length},
  connections: ${connections.length},
  entry: "node1",
  exit: "node7"
});

pipeline.run(async (data) => {
  // Process data through nodes
  const output = await pipeline.execute(data);
  return output;
});`}
                  </pre>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PipelineBuilder;
