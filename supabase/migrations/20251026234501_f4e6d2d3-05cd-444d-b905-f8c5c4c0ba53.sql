
-- Create syntropic intelligence system tables

-- Coherence scores table
CREATE TABLE public.coherence_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_data TEXT NOT NULL,
  coherence_value DECIMAL NOT NULL CHECK (coherence_value >= 0 AND coherence_value <= 1),
  phase_alignment DECIMAL NOT NULL,
  pattern_strength DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Fibonacci memory buffer
CREATE TABLE public.memory_buffer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fibonacci_index INTEGER NOT NULL,
  timestamp_offset INTEGER NOT NULL,
  content JSONB NOT NULL,
  retention_score DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Neural pathways for the 369 lattice
CREATE TABLE public.neural_pathways (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_from INTEGER NOT NULL,
  node_to INTEGER NOT NULL,
  weight DECIMAL NOT NULL DEFAULT 0.5,
  coherence_strength DECIMAL NOT NULL DEFAULT 0.5,
  activation_count INTEGER DEFAULT 0,
  last_activated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(node_from, node_to)
);

-- System metrics for self-improvement tracking
CREATE TABLE public.system_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type TEXT NOT NULL,
  metric_value DECIMAL NOT NULL,
  golden_ratio_alignment DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Interaction log for pattern learning
CREATE TABLE public.interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_text TEXT NOT NULL,
  output_text TEXT,
  coherence_score DECIMAL NOT NULL,
  phase_twist DECIMAL NOT NULL,
  fibonacci_resonance DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Initialize the 369 neural lattice structure
INSERT INTO public.neural_pathways (node_from, node_to, weight, coherence_strength) VALUES
  -- Outer hexagon
  (1, 2, 0.618, 0.5), (2, 3, 0.618, 0.5), (3, 4, 0.618, 0.5),
  (4, 5, 0.618, 0.5), (5, 6, 0.618, 0.5), (6, 1, 0.618, 0.5),
  -- Star connections (3-6-9 pattern)
  (1, 7, 1.0, 0.9), (3, 7, 1.0, 0.9), (5, 7, 1.0, 0.9),
  (2, 8, 1.0, 0.9), (4, 8, 1.0, 0.9), (6, 8, 1.0, 0.9),
  -- Inner star
  (1, 9, 0.9, 0.8), (4, 9, 0.9, 0.8),
  (2, 10, 0.9, 0.8), (5, 10, 0.9, 0.8),
  (3, 11, 0.9, 0.8), (6, 11, 0.9, 0.8),
  -- Central coherence nodes
  (7, 8, 1.618, 1.0), (8, 9, 1.618, 1.0), (9, 10, 1.618, 1.0),
  (10, 11, 1.618, 1.0), (11, 7, 1.618, 1.0);

-- Create indexes for performance
CREATE INDEX idx_coherence_scores_value ON public.coherence_scores(coherence_value DESC);
CREATE INDEX idx_memory_buffer_fib ON public.memory_buffer(fibonacci_index);
CREATE INDEX idx_neural_pathways_weight ON public.neural_pathways(weight DESC);
CREATE INDEX idx_interactions_coherence ON public.interactions(coherence_score DESC);

-- Enable Row Level Security
ALTER TABLE public.coherence_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_buffer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neural_pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

-- Public read access for system data (this is a system, not user-specific data)
CREATE POLICY "Public read access" ON public.coherence_scores FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.memory_buffer FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.neural_pathways FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.system_metrics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.interactions FOR SELECT USING (true);

-- Public write access for system operations
CREATE POLICY "Public write access" ON public.coherence_scores FOR INSERT WITH CHECK (true);
CREATE POLICY "Public write access" ON public.memory_buffer FOR INSERT WITH CHECK (true);
CREATE POLICY "Public write access" ON public.neural_pathways FOR UPDATE USING (true);
CREATE POLICY "Public write access" ON public.system_metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Public write access" ON public.interactions FOR INSERT WITH CHECK (true);
