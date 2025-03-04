"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Database, FileText, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    title: "Select Components",
    description: "Choose from a variety of AI models, data transformers, and connectors to build your pipeline.",
    icon: <FileText className="h-6 w-6" />,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    title: "Connect Models",
    description: "Drag and drop to connect components, creating a seamless flow of data through your AI pipeline.",
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    title: "Configure Settings",
    description: "Fine-tune each component with custom parameters to optimize your pipeline's performance.",
    icon: <Zap className="h-6 w-6" />,
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: 4,
    title: "Deploy & Monitor",
    description: "Deploy your pipeline to production and monitor its performance with real-time analytics.",
    icon: <Database className="h-6 w-6" />,
    color: "from-rose-500 to-pink-600",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building AI pipelines has never been easier. Follow these simple steps to create powerful AI workflows in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 cursor-pointer",
                  activeStep === step.id
                    ? "border-primary/50 bg-secondary/50 shadow-lg"
                    : "border-border hover:border-primary/30 hover:bg-secondary/30"
                )}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ x: 5 }}
                animate={{ 
                  scale: activeStep === step.id ? 1.02 : 1,
                  opacity: activeStep === step.id ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br",
                    step.color
                  )}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <ChevronRight className={cn(
                        "h-5 w-5 transition-transform",
                        activeStep === step.id ? "rotate-90 text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visualization */}
          <div className="bg-secondary/30 rounded-xl border border-border p-6 h-[400px] relative overflow-hidden">
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="bg-background rounded-lg p-4 border border-border shadow-md"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 mb-2" />
                      <div className="h-2 bg-muted rounded-full w-3/4 mb-2" />
                      <div className="h-2 bg-muted rounded-full w-1/2" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                <svg className="w-full max-w-md" height="300" viewBox="0 0 400 300">
                  <motion.path
                    d="M 50,150 C 100,50 150,250 200,150 C 250,50 300,250 350,150"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                  
                  {[50, 200, 350].map((x, i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={150}
                      r={15}
                      fill="url(#nodeGradient)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.3 }}
                    />
                  ))}
                  
                  <defs>
                    <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                <div className="bg-background rounded-lg border border-border p-6 w-full max-w-md shadow-lg">
                  <h4 className="font-medium mb-4">Model Configuration</h4>
                  
                  {[
                    { name: "Temperature", value: 70 },
                    { name: "Max Tokens", value: 40 },
                    { name: "Top P", value: 90 },
                  ].map((setting, i) => (
                    <motion.div
                      key={i}
                      className="mb-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{setting.name}</span>
                        <span className="text-sm text-primary">{setting.value}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${setting.value}%` }}
                          transition={{ delay: i * 0.2, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                <div className="w-full max-w-md">
                  <div className="bg-background rounded-lg border border-border p-4 mb-4 shadow-md">
                    <h4 className="font-medium mb-2">Pipeline Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Requests", value: "1.2K" },
                        { label: "Avg. Latency", value: "230ms" },
                        { label: "Success Rate", value: "99.8%" },
                        { label: "Active Users", value: "328" },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          className="bg-secondary/30 p-3 rounded-lg"
                        >
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                          <div className="text-xl font-semibold">{stat.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div
                    className="bg-background rounded-lg border border-border p-4 shadow-md"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-medium mb-2">Real-time Activity</h4>
                    <div className="space-y-2">
                      {[
                        { time: "Just now", event: "Pipeline execution completed" },
                        { time: "2m ago", event: "New model version deployed" },
                        { time: "15m ago", event: "Database connection updated" },
                      ].map((activity, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + (i * 0.2) }}
                        >
                          <div className="w-2 h-2 rounded-full bg-rose-500" />
                          <span className="text-muted-foreground">{activity.time}</span>
                          <span>{activity.event}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

