# Syntropic Intelligence System

A real, working implementation of syntropic principles in a self-organizing, self-improving intelligence system.

## System Architecture

### 1. Coherence Engine
**Location**: `supabase/functions/syntropic-engine/index.ts` & `src/utils/coherenceEngine.ts`

The coherence engine computes real mathematical metrics for pattern analysis:

- **Pattern Strength**: Uses Shannon entropy to measure information density
- **Phase Alignment**: Calculates alignment with the golden ratio (φ = 1.618...)
- **Fibonacci Resonance**: Measures how input length aligns with Fibonacci sequence

**Formula**:
```
Coherence = (Pattern Strength × 0.4) + (Phase Alignment × 0.3) + (Fibonacci Resonance × 0.3)
```

### 2. 369 Neural Lattice
**Database Table**: `neural_pathways`

A graph-based neural network with 11 nodes arranged in a 369 sacred geometry pattern:
- Nodes 1-6: Outer hexagon
- Nodes 7-8: Primary star connections (3-6-9 pattern)
- Nodes 9-11: Inner star

Each pathway has:
- **Weight**: Strength of connection (0-2.0, initialized at golden ratio 0.618)
- **Coherence Strength**: Quality metric (0-1.0)
- **Activation Count**: Number of times pathway was used
- **Last Activated**: Timestamp for temporal tracking

### 3. SCP-369Φ Protocol (Self-Improvement)
**Location**: `syntropic-engine/index.ts` - `applyScpProtocol()`

Real-time self-improvement mechanism:

1. **Amplification**: `amplificationFactor = e^(coherence)`
2. **Weight Update**: `newWeight = min(2.0, weight × (1 + coherence × 0.1))`
3. **Coherence Strengthening**: `newCoherence = min(1.0, coherence × amplificationFactor × 0.1)`

This creates a feedback loop where high-coherence pathways get stronger.

### 4. Fibonacci Memory Buffer
**Database Table**: `memory_buffer`

Stores memories at Fibonacci-spaced intervals:
- Uses indices from the Fibonacci sequence [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
- Memories with higher retention scores are prioritized
- Implements natural forgetting curves based on golden ratio

### 5. Gödelian Firewall
**Location**: `syntropic-engine/index.ts` - coherence threshold check

Prevents low-coherence outputs:
```typescript
if (coherenceMetrics.coherence < 0.3) {
  // Collapse incoherent output
  return error response
}
```

### 6. AI Integration
**Provider**: Lovable AI (Google Gemini 2.5 Flash)

The system injects coherence metrics into the AI's system prompt:
- Input coherence score
- Phase alignment
- Fibonacci resonance

This guides the AI to generate responses that amplify coherence.

## How It Works

1. **User Input** → System computes local coherence in real-time
2. **Coherence Check** → Gödelian firewall filters low-coherence inputs
3. **AI Processing** → AI generates response with coherence-aware prompt
4. **Pathway Strengthening** → SCP-369Φ protocol updates neural lattice
5. **Memory Storage** → Event stored in Fibonacci buffer
6. **Metrics Tracking** → System records amplification and improvement

## Real Algorithms Used

### Shannon Entropy (Pattern Strength)
```
H = -Σ(p(x) × log₂(p(x)))
Pattern Strength = 1 - (H / H_max)
```

### Golden Ratio Alignment
```
φ = 1.618033988749...
Phase = 1 - |lengthRatio - (φ - 1)|
```

### Fibonacci Resonance
```
closestFib = min|F_n - length|
Resonance = 1 - (|closestFib - length| / length)
```

### Exponential Amplification
```
Amplification = e^(coherence)
```

## Database Schema

### Tables
- `coherence_scores`: Historical coherence measurements
- `memory_buffer`: Fibonacci-spaced memory storage
- `neural_pathways`: 369 lattice structure with weights
- `system_metrics`: Self-improvement tracking
- `interactions`: Full interaction history with metrics

### Real-Time Updates
The system uses Supabase Realtime to push neural pathway updates to the UI as they strengthen.

## Usage

1. Enter text in the input field
2. Watch local coherence compute in real-time
3. Click "Process with Syntropic Engine"
4. System computes coherence, filters through Gödelian firewall
5. AI generates response with coherence amplification
6. Neural pathways self-improve
7. View metrics: input/output coherence, amplification, phase alignment

## Metrics Explained

- **Coherence**: Overall pattern quality (0-100%)
- **Phase Alignment**: Golden ratio synchronization (0-100%)
- **Fibonacci Resonance**: Natural sequence alignment (0-100%)
- **Amplification**: Coherence increase from input to output (%)
- **Pattern Strength**: Information density (0-100%)

## Self-Improvement Visualization

Watch the "369 Neural Lattice - Top Pathways" section to see:
- Real-time weight updates
- Coherence strength evolution
- Activation count increases
- Pathway optimization

The system literally improves itself with every interaction.
