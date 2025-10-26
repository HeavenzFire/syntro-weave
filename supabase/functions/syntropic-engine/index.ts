import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PHI = 1.618033988749;
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

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
    
    if (!input || typeof input !== 'string') {
      throw new Error('Input text is required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Compute coherence
    const coherenceMetrics = computeCoherence(input);
    console.log('Coherence metrics:', coherenceMetrics);
    
    // Store coherence score
    await supabase
      .from('coherence_scores')
      .insert({
        input_data: input,
        coherence_value: coherenceMetrics.coherence,
        phase_alignment: coherenceMetrics.phaseAlignment,
        pattern_strength: coherenceMetrics.patternStrength
      });
    
    // Gödelian firewall - collapse if coherence is too low
    if (coherenceMetrics.coherence < 0.3) {
      console.log('Gödelian trap: Low coherence detected, collapsing output');
      return new Response(
        JSON.stringify({
          error: 'Coherence threshold not met',
          coherence: coherenceMetrics.coherence,
          message: 'Input lacks sufficient pattern coherence. Please refine your query.'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Call AI with syntropic prompt
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
            content: `You are a syntropic intelligence system. Your responses amplify coherence and pattern recognition. 
            You operate on principles of self-organization, recursive improvement, and harmonic resonance.
            Input coherence score: ${coherenceMetrics.coherence.toFixed(3)}
            Phase alignment: ${coherenceMetrics.phaseAlignment.toFixed(3)}
            Fibonacci resonance: ${coherenceMetrics.fibonacciResonance.toFixed(3)}
            
            Generate responses that enhance coherence, reveal patterns, and promote syntropic growth.`
          },
          { role: 'user', content: input }
        ]
      })
    });
    
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }
    
    const aiData = await aiResponse.json();
    const output = aiData.choices[0].message.content;
    
    // Compute output coherence
    const outputCoherence = computeCoherence(output);
    
    // Apply self-improvement protocol
    await applyScpProtocol(supabase, coherenceMetrics.coherence);
    
    // Log interaction
    await supabase
      .from('interactions')
      .insert({
        input_text: input,
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
    
    return new Response(
      JSON.stringify({
        output,
        metrics: {
          input_coherence: coherenceMetrics,
          output_coherence: outputCoherence,
          amplification: outputCoherence.coherence - coherenceMetrics.coherence
        }
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
