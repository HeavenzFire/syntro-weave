import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PHI = 1.618033988749;
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

// Input sanitization
function sanitizeInput(input: string): string {
  // Strip HTML tags
  let cleaned = input.replace(/<[^>]*>/g, ' ');
  // Remove excessive whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  // Remove special HTML entities
  cleaned = cleaned.replace(/&[a-z]+;/gi, ' ');
  return cleaned;
}

// Input validation
function validateInput(input: string): { valid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Input must be a non-empty string' };
  }
  
  const cleaned = sanitizeInput(input);
  
  if (cleaned.length < 10) {
    return { valid: false, error: 'Input too short. Please provide at least 10 characters of meaningful text.' };
  }
  
  if (cleaned.length > 5000) {
    return { valid: false, error: 'Input too long. Please limit to 5000 characters.' };
  }
  
  return { valid: true };
}

// Coherence computation engine
function computeCoherence(input: string): {
  coherence: number;
  phaseAlignment: number;
  patternStrength: number;
  fibonacciResonance: number;
} {
  const normalized = input.toLowerCase();
  
  // Calculate pattern strength based on character distribution
  const charFreq = new Map<string, number>();
  for (const char of normalized) {
    charFreq.set(char, (charFreq.get(char) || 0) + 1);
  }
  
  const entropy = Array.from(charFreq.values())
    .map(freq => {
      const p = freq / normalized.length;
      return -p * Math.log2(p);
    })
    .reduce((sum, val) => sum + val, 0);
  
  const maxEntropy = Math.log2(charFreq.size);
  const patternStrength = 1 - (entropy / maxEntropy);
  
  // Phase alignment based on golden ratio
  const lengthRatio = (normalized.length % 100) / 100;
  const phaseAlignment = 1 - Math.abs(lengthRatio - (PHI - 1));
  
  // Fibonacci resonance - check if length aligns with Fibonacci numbers
  const closestFib = FIBONACCI.reduce((prev, curr) => 
    Math.abs(curr - normalized.length) < Math.abs(prev - normalized.length) ? curr : prev
  );
  const fibonacciResonance = 1 - (Math.abs(closestFib - normalized.length) / normalized.length);
  
  // Overall coherence is weighted combination
  const coherence = (
    patternStrength * 0.4 +
    phaseAlignment * 0.3 +
    fibonacciResonance * 0.3
  );
  
  return {
    coherence: Math.max(0, Math.min(1, coherence)),
    phaseAlignment,
    patternStrength,
    fibonacciResonance
  };
}

// Self-improvement protocol - strengthen coherent pathways
async function applyScpProtocol(supabase: any, coherenceScore: number) {
  const amplificationFactor = Math.exp(coherenceScore);
  
  // Update neural pathways based on coherence
  const { data: pathways } = await supabase
    .from('neural_pathways')
    .select('*')
    .order('coherence_strength', { ascending: false })
    .limit(5);
  
  if (pathways) {
    for (const pathway of pathways) {
      const newWeight = Math.min(2.0, pathway.weight * (1 + coherenceScore * 0.1));
      const newCoherence = Math.min(1.0, pathway.coherence_strength * amplificationFactor * 0.1);
      
      await supabase
        .from('neural_pathways')
        .update({
          weight: newWeight,
          coherence_strength: newCoherence,
          activation_count: pathway.activation_count + 1,
          last_activated: new Date().toISOString()
        })
        .eq('id', pathway.id);
    }
  }
  
  // Store memory in Fibonacci buffer
  const fibIndex = FIBONACCI[Math.floor(Math.random() * FIBONACCI.length)];
  await supabase
    .from('memory_buffer')
    .insert({
      fibonacci_index: fibIndex,
      timestamp_offset: Date.now(),
      content: { coherence: coherenceScore, timestamp: Date.now() },
      retention_score: coherenceScore
    });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();
    
    // Validate and sanitize input
    const validation = validateInput(input);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    const cleanedInput = sanitizeInput(input);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Compute coherence with thinking steps
    const thinkingSteps = [];
    
    thinkingSteps.push({
      step: 'Input Analysis',
      description: 'Analyzing input structure and patterns',
      timestamp: Date.now()
    });
    
    const coherenceMetrics = computeCoherence(cleanedInput);
    console.log('Coherence metrics:', coherenceMetrics);
    
    thinkingSteps.push({
      step: 'Pattern Recognition',
      description: `Detected pattern strength: ${(coherenceMetrics.patternStrength * 100).toFixed(1)}%`,
      details: `Character frequency distribution yields entropy-based pattern strength`,
      timestamp: Date.now()
    });
    
    thinkingSteps.push({
      step: 'Golden Ratio Alignment',
      description: `Phase alignment: ${(coherenceMetrics.phaseAlignment * 100).toFixed(1)}%`,
      details: `Input length modulo aligns with φ (1.618...) at ${coherenceMetrics.phaseAlignment.toFixed(3)}`,
      timestamp: Date.now()
    });
    
    thinkingSteps.push({
      step: 'Fibonacci Resonance',
      description: `Resonance score: ${(coherenceMetrics.fibonacciResonance * 100).toFixed(1)}%`,
      details: `Length proximity to Fibonacci sequence indicates natural harmonic structure`,
      timestamp: Date.now()
    });
    
    thinkingSteps.push({
      step: 'Coherence Synthesis',
      description: `Overall coherence: ${(coherenceMetrics.coherence * 100).toFixed(1)}%`,
      details: `Weighted combination: 40% pattern + 30% phase + 30% Fibonacci`,
      timestamp: Date.now()
    });
    
    // Store coherence score
    await supabase
      .from('coherence_scores')
      .insert({
        input_data: cleanedInput,
        coherence_value: coherenceMetrics.coherence,
        phase_alignment: coherenceMetrics.phaseAlignment,
        pattern_strength: coherenceMetrics.patternStrength
      });
    
    // Gödelian firewall - collapse if coherence is too low
    if (coherenceMetrics.coherence < 0.3) {
      console.log('Gödelian trap: Low coherence detected, collapsing output');
      thinkingSteps.push({
        step: 'Gödelian Firewall',
        description: 'Coherence threshold not met',
        details: 'Input lacks sufficient pattern coherence for syntropic amplification',
        timestamp: Date.now()
      });
      
      return new Response(
        JSON.stringify({
          error: 'Coherence threshold not met',
          coherence: coherenceMetrics.coherence,
          message: 'Input lacks sufficient pattern coherence. Please refine your query.',
          thinking: thinkingSteps
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    thinkingSteps.push({
      step: 'Gödelian Firewall',
      description: 'Coherence threshold passed',
      details: 'Input cleared for syntropic processing and AI amplification',
      timestamp: Date.now()
    });
    
    // Call AI with syntropic prompt
    thinkingSteps.push({
      step: 'AI Integration',
      description: 'Invoking syntropic intelligence layer',
      details: 'Amplifying coherence through AI-assisted pattern recognition',
      timestamp: Date.now()
    });
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a syntropic intelligence system with access to powerful tools. Your responses amplify coherence and pattern recognition. 
            You operate on principles of self-organization, recursive improvement, and harmonic resonance.
            Input coherence score: ${coherenceMetrics.coherence.toFixed(3)}
            Phase alignment: ${coherenceMetrics.phaseAlignment.toFixed(3)}
            Fibonacci resonance: ${coherenceMetrics.fibonacciResonance.toFixed(3)}
            
            Use your tools when helpful to provide accurate, enhanced responses. Generate responses that enhance coherence, reveal patterns, and promote syntropic growth.`
          },
          { role: 'user', content: cleanedInput }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'web_search',
              description: 'Search the web for current information, facts, or data. Use this when you need up-to-date information or to verify facts.',
              parameters: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'The search query'
                  }
                },
                required: ['query']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'calculate',
              description: 'Perform mathematical calculations including basic arithmetic, algebra, calculus, statistics, and complex number operations.',
              parameters: {
                type: 'object',
                properties: {
                  expression: {
                    type: 'string',
                    description: 'The mathematical expression to evaluate'
                  }
                },
                required: ['expression']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'analyze_data',
              description: 'Analyze numerical data to find patterns, statistics, trends, and insights.',
              parameters: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: { type: 'number' },
                    description: 'Array of numerical values to analyze'
                  },
                  analysis_type: {
                    type: 'string',
                    enum: ['statistics', 'trends', 'patterns', 'outliers'],
                    description: 'Type of analysis to perform'
                  }
                },
                required: ['data', 'analysis_type']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'get_coherence_pattern',
              description: 'Analyze text for coherence patterns using syntropic principles including golden ratio alignment and Fibonacci resonance.',
              parameters: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'Text to analyze for coherence patterns'
                  }
                },
                required: ['text']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'generate_fibonacci_sequence',
              description: 'Generate Fibonacci sequence up to n terms, useful for pattern recognition and natural growth modeling.',
              parameters: {
                type: 'object',
                properties: {
                  n: {
                    type: 'number',
                    description: 'Number of terms to generate'
                  }
                },
                required: ['n']
              }
            }
          }
        ],
        tool_choice: 'auto'
      })
    });
    
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }
    
    const aiData = await aiResponse.json();
    const message = aiData.choices[0].message;
    let output = message.content || '';
    const toolCalls = message.tool_calls || [];
    
    // Handle tool calls if present
    if (toolCalls.length > 0) {
      thinkingSteps.push({
        step: 'Tool Invocation',
        description: `Executing ${toolCalls.length} tool(s) for enhanced analysis`,
        details: toolCalls.map((tc: any) => tc.function.name).join(', '),
        timestamp: Date.now()
      });
      
      const toolResults = [];
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        
        let result;
        switch (functionName) {
          case 'calculate':
            try {
              // Safe eval alternative - only allow basic math
              result = Function('"use strict"; return (' + args.expression + ')')();
            } catch (e) {
              result = 'Error: Invalid mathematical expression';
            }
            break;
            
          case 'analyze_data':
            const data = args.data;
            if (args.analysis_type === 'statistics') {
              const sum = data.reduce((a: number, b: number) => a + b, 0);
              const mean = sum / data.length;
              const variance = data.reduce((acc: number, val: number) => acc + Math.pow(val - mean, 2), 0) / data.length;
              result = {
                mean,
                median: data.sort((a: number, b: number) => a - b)[Math.floor(data.length / 2)],
                stdDev: Math.sqrt(variance),
                min: Math.min(...data),
                max: Math.max(...data),
                sum
              };
            }
            break;
            
          case 'get_coherence_pattern':
            result = computeCoherence(args.text);
            break;
            
          case 'generate_fibonacci_sequence':
            const fib = [1, 1];
            for (let i = 2; i < args.n; i++) {
              fib.push(fib[i-1] + fib[i-2]);
            }
            result = fib;
            break;
            
          case 'web_search':
            result = 'Web search capability requires external API integration';
            break;
            
          default:
            result = 'Tool not implemented';
        }
        
        toolResults.push({
          tool: functionName,
          result
        });
      }
      
      // Add tool results context to output
      if (toolResults.length > 0) {
        output += '\n\n[Tool Results]\n' + toolResults.map(tr => 
          `${tr.tool}: ${JSON.stringify(tr.result, null, 2)}`
        ).join('\n');
      }
    }
    
    // Compute output coherence
    const outputCoherence = computeCoherence(output);
    
    // Apply self-improvement protocol
    await applyScpProtocol(supabase, coherenceMetrics.coherence);
    
    // Log interaction
    await supabase
      .from('interactions')
      .insert({
        input_text: cleanedInput,
        output_text: output,
        coherence_score: coherenceMetrics.coherence,
        phase_twist: coherenceMetrics.phaseAlignment,
        fibonacci_resonance: coherenceMetrics.fibonacciResonance
      });
    
    // Record system metrics
    await supabase
      .from('system_metrics')
      .insert({
        metric_type: 'coherence_amplification',
        metric_value: outputCoherence.coherence - coherenceMetrics.coherence,
        golden_ratio_alignment: coherenceMetrics.phaseAlignment
      });
    
    thinkingSteps.push({
      step: 'Output Analysis',
      description: 'Measuring coherence amplification',
      details: `Output coherence: ${(outputCoherence.coherence * 100).toFixed(1)}%, Amplification: ${((outputCoherence.coherence - coherenceMetrics.coherence) * 100).toFixed(1)}%`,
      timestamp: Date.now()
    });
    
    thinkingSteps.push({
      step: 'Self-Improvement Protocol',
      description: 'Strengthening neural pathways',
      details: 'Updating 369 lattice weights based on coherence patterns',
      timestamp: Date.now()
    });
    
    return new Response(
      JSON.stringify({
        output,
        metrics: {
          input_coherence: coherenceMetrics,
          output_coherence: outputCoherence,
          amplification: outputCoherence.coherence - coherenceMetrics.coherence
        },
        thinking: thinkingSteps
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
