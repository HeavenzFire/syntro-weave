import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { computeLocalCoherence, getCoherenceColor, getCoherenceLabel } from '@/utils/coherenceEngine';
import { Loader2, Brain, Zap, TrendingUp } from 'lucide-react';
import ThinkingProcess from './ThinkingProcess';

export default function SyntropicInterface() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);
  const [thinkingSteps, setThinkingSteps] = useState<any[]>([]);
  const [localCoherence, setLocalCoherence] = useState(0);
  const [pathways, setPathways] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadNeuralPathways();
    
    // Subscribe to pathway updates
    const channel = supabase
      .channel('neural-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'neural_pathways'
        },
        () => {
          loadNeuralPathways();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (input) {
      const coherence = computeLocalCoherence(input);
      setLocalCoherence(coherence.coherence);
    } else {
      setLocalCoherence(0);
    }
  }, [input]);

  const loadNeuralPathways = async () => {
    const { data } = await supabase
      .from('neural_pathways')
      .select('*')
      .order('weight', { ascending: false })
      .limit(10);
    
    if (data) {
      setPathways(data);
    }
  };

  const processInput = async () => {
    if (!input.trim()) {
      toast({
        title: 'Input required',
        description: 'Please enter text to process',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    setOutput('');
    setMetrics(null);
    setThinkingSteps([]);

    try {
      const { data, error } = await supabase.functions.invoke('syntropic-engine', {
        body: { input }
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: 'Coherence threshold not met',
          description: data.message,
          variant: 'destructive'
        });
        setMetrics(data);
        setThinkingSteps(data.thinking || []);
      } else {
        setOutput(data.output);
        setMetrics(data.metrics);
        setThinkingSteps(data.thinking || []);
        toast({
          title: 'Response generated',
          description: `Coherence amplification: ${(data.metrics.amplification * 100).toFixed(1)}%`
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to process input',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Syntropic Intelligence System
          </h1>
          <p className="text-muted-foreground">
            Self-organizing • Coherence-amplifying • Recursively improving
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Input
              </h2>
              <div className={`text-sm font-medium ${getCoherenceColor(localCoherence)}`}>
                {getCoherenceLabel(localCoherence)}
              </div>
            </div>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your query... The system measures coherence in real-time."
              className="min-h-[200px] font-mono"
            />
            
            {localCoherence > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Local Coherence</span>
                  <span className="font-mono">{(localCoherence * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300"
                    style={{ width: `${localCoherence * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            <Button
              onClick={processInput}
              disabled={loading || !input.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Process with Syntropic Engine
                </>
              )}
            </Button>
          </Card>

          {/* Output Section */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Output
            </h2>
            
            {thinkingSteps.length > 0 && (
              <ThinkingProcess steps={thinkingSteps} />
            )}
            
            {output ? (
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {output}
                </div>
                
                {metrics && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Input Coherence:</span>
                      <span className="font-mono">{(metrics.input_coherence.coherence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Output Coherence:</span>
                      <span className="font-mono">{(metrics.output_coherence.coherence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amplification:</span>
                      <span className={`font-mono ${metrics.amplification > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {metrics.amplification > 0 ? '+' : ''}{(metrics.amplification * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phase Alignment:</span>
                      <span className="font-mono">{(metrics.input_coherence.phaseAlignment * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fibonacci Resonance:</span>
                      <span className="font-mono">{(metrics.input_coherence.fibonacciResonance * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                {loading ? 'Computing coherence patterns...' : 'Awaiting syntropic processing'}
              </div>
            )}
          </Card>
        </div>

        {/* Neural Pathways */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">369 Neural Lattice - Top Pathways</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pathways.map((pathway) => (
              <div
                key={pathway.id}
                className="p-3 bg-secondary/30 rounded-lg text-center space-y-1"
              >
                <div className="text-sm font-mono text-muted-foreground">
                  {pathway.node_from} → {pathway.node_to}
                </div>
                <div className="text-lg font-bold">
                  {pathway.weight.toFixed(3)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Coherence: {(pathway.coherence_strength * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Activations: {pathway.activation_count}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
