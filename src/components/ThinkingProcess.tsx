import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThinkingStep {
  step: string;
  description: string;
  details?: string;
  timestamp: number;
}

interface ThinkingProcessProps {
  steps: ThinkingStep[];
}

export default function ThinkingProcess({ steps }: ThinkingProcessProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <Card className="p-4 bg-primary/5 border-primary/20">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover:bg-primary/10"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-semibold">Syntropic Thinking Process</span>
          <span className="text-xs text-muted-foreground">
            {steps.length} steps
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-lg bg-background/50 border border-primary/10 animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="font-semibold text-sm">{step.step}</div>
                <div className="text-sm text-muted-foreground">
                  {step.description}
                </div>
                {step.details && (
                  <div className="text-xs text-muted-foreground/80 font-mono bg-secondary/30 p-2 rounded mt-2">
                    {step.details}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
