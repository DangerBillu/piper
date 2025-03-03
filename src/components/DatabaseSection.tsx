
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Server, Shield, Code, Globe, ArrowRight } from 'lucide-react';

const DatabaseSection = () => {
  const [activeTab, setActiveTab] = useState<'storage' | 'security' | 'integration'>('storage');

  return (
    <section id="database" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]"></div>
      
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">Powerful Data Management</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Store, manage, and analyze your pipeline data with our integrated database solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex justify-center space-x-2 mb-8 p-1 bg-secondary/50 rounded-full animate-slide-up animation-delay-300">
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === 'storage' ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('storage')}
              >
                Data Storage
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === 'security' ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === 'integration' ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('integration')}
              >
                Integration
              </button>
            </div>

            <div className="neo-card p-8 shadow-glow animate-slide-up animation-delay-400">
              {activeTab === 'storage' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Database className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Scalable Data Storage</h3>
                      <p className="text-muted-foreground">
                        Our database scales automatically with your workload, from small projects to enterprise-level applications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Server className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Multiple Storage Options</h3>
                      <p className="text-muted-foreground">
                        Choose from SQL, NoSQL, or vector databases depending on your specific needs and data types.
                      </p>
                    </div>
                  </div>
                  <div className="pl-12 border-l-2 border-primary/20 mt-8">
                    <ul className="space-y-2 text-sm">
                      <li className="text-muted-foreground">• Automatic backups and point-in-time recovery</li>
                      <li className="text-muted-foreground">• Global replication for low-latency access</li>
                      <li className="text-muted-foreground">• Structured and unstructured data support</li>
                      <li className="text-muted-foreground">• Built-in analytics and reporting</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Enterprise-Grade Security</h3>
                      <p className="text-muted-foreground">
                        Your data is protected with industry-leading security practices including encryption at rest and in transit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Code className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Access Control</h3>
                      <p className="text-muted-foreground">
                        Fine-grained access control and permission management for team environments.
                      </p>
                    </div>
                  </div>
                  <div className="pl-12 border-l-2 border-primary/20 mt-8">
                    <ul className="space-y-2 text-sm">
                      <li className="text-muted-foreground">• GDPR and CCPA compliant data handling</li>
                      <li className="text-muted-foreground">• SOC 2 and ISO 27001 certified infrastructure</li>
                      <li className="text-muted-foreground">• Regular security audits and penetration testing</li>
                      <li className="text-muted-foreground">• Data anonymization options for sensitive workloads</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'integration' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Seamless Integrations</h3>
                      <p className="text-muted-foreground">
                        Connect your pipeline data with your existing tools and services through our API and pre-built connectors.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Code className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">API-First Design</h3>
                      <p className="text-muted-foreground">
                        Our RESTful API allows you to programmatically access and manage your data from any application.
                      </p>
                    </div>
                  </div>
                  <div className="pl-12 border-l-2 border-primary/20 mt-8">
                    <ul className="space-y-2 text-sm">
                      <li className="text-muted-foreground">• Webhook support for real-time events</li>
                      <li className="text-muted-foreground">• Native integration with popular BI tools</li>
                      <li className="text-muted-foreground">• Import/export functionality with common formats</li>
                      <li className="text-muted-foreground">• Custom integration development services available</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative h-[400px] animate-slide-up animation-delay-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-full h-full bg-secondary/10 backdrop-blur-sm border border-primary/10 overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="bg-black/80 h-full text-xs md:text-sm font-mono p-4 text-green-400 overflow-auto">
                    {activeTab === 'storage' && (
                      <pre className="whitespace-pre-wrap">
{`// Sample database schema for pipeline data
CREATE TABLE pipelines (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  owner_id UUID REFERENCES users(id)
);

CREATE TABLE nodes (
  id UUID PRIMARY KEY,
  pipeline_id UUID REFERENCES pipelines(id),
  node_type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  config JSONB,
  position_x INTEGER,
  position_y INTEGER
);

CREATE TABLE edges (
  id UUID PRIMARY KEY,
  pipeline_id UUID REFERENCES pipelines(id),
  source_id UUID REFERENCES nodes(id),
  target_id UUID REFERENCES nodes(id),
  config JSONB
);

// Storing execution results
CREATE TABLE pipeline_runs (
  id UUID PRIMARY KEY,
  pipeline_id UUID REFERENCES pipelines(id),
  status VARCHAR(50) NOT NULL,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  result JSONB
);`}
                      </pre>
                    )}
                    
                    {activeTab === 'security' && (
                      <pre className="whitespace-pre-wrap">
{`// Implementing row-level security policies
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;

CREATE POLICY pipeline_owner_access ON pipelines
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY pipeline_team_read ON pipelines
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id IN (
        SELECT team_id FROM pipeline_teams
        WHERE pipeline_teams.pipeline_id = pipelines.id
      )
      AND team_members.user_id = auth.uid()
    )
  );

// Encryption function for sensitive data
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data TEXT) 
RETURNS TEXT AS $$
BEGIN
  RETURN PGP_SYM_ENCRYPT(
    data,
    current_setting('app.settings.encryption_key')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`}
                      </pre>
                    )}
                    
                    {activeTab === 'integration' && (
                      <pre className="whitespace-pre-wrap">
{`// Example API interaction with database
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://piper.supabase.co',
  'your-api-key'
)

// Fetch pipelines
async function getPipelines() {
  const { data, error } = await supabase
    .from('pipelines')
    .select(\`
      id,
      name,
      description,
      created_at,
      nodes (
        id, node_type, name, config
      ),
      edges (
        id, source_id, target_id
      )
    \`)
    
  if (error) {
    console.error('Error fetching pipelines:', error)
    return []
  }
  
  return data
}

// Execute pipeline and store results
async function executePipeline(pipelineId) {
  // Create a new run record
  const { data: run, error } = await supabase
    .from('pipeline_runs')
    .insert({
      pipeline_id: pipelineId,
      status: 'running',
      started_at: new Date()
    })
    .select()
    
  // Process through pipeline nodes...
  
  // Update with results
  await supabase
    .from('pipeline_runs')
    .update({
      status: 'completed',
      completed_at: new Date(),
      result: { output: 'Pipeline execution results...' }
    })
    .eq('id', run[0].id)
}`}
                      </pre>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-slide-up animation-delay-600">
          <Button size="lg" className="rounded-full shadow-glow">
            Explore Database Options <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DatabaseSection;
