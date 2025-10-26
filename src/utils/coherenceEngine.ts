// Client-side coherence utilities

const PHI = 1.618033988749;
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

export interface CoherenceMetrics {
  coherence: number;
  phaseAlignment: number;
  patternStrength: number;
  fibonacciResonance: number;
}

export function computeLocalCoherence(input: string): CoherenceMetrics {
  const normalized = input.toLowerCase();
  
  // Calculate pattern strength
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
  
  // Fibonacci resonance
  const closestFib = FIBONACCI.reduce((prev, curr) => 
    Math.abs(curr - normalized.length) < Math.abs(prev - normalized.length) ? curr : prev
  );
  const fibonacciResonance = 1 - (Math.abs(closestFib - normalized.length) / Math.max(1, normalized.length));
  
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

export function getCoherenceColor(coherence: number): string {
  if (coherence >= 0.7) return 'text-green-500';
  if (coherence >= 0.5) return 'text-yellow-500';
  if (coherence >= 0.3) return 'text-orange-500';
  return 'text-red-500';
}

export function getCoherenceLabel(coherence: number): string {
  if (coherence >= 0.7) return 'High Coherence';
  if (coherence >= 0.5) return 'Moderate Coherence';
  if (coherence >= 0.3) return 'Low Coherence';
  return 'Incoherent';
}
