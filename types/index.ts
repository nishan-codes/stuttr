export interface GameLogFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

export interface AnalysisResult {
  overallScore: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  issues: Issue[];
  metrics: PerformanceMetrics;
  recommendations: Recommendation[];
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  impact: string;
}

export interface PerformanceMetrics {
  averageFps: number;
  fps: number[];
  frameTimeVariance: number;
  memoryUsage: number[];
  cpuUsage: number[];
  timestamps: string[];
  lagSpikes: LagSpike[];
}

export interface LagSpike {
  timestamp: string;
  duration: number;
  severity: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  icon: string;
  learnmore: string;
}

export interface AnalysisProgress {
  step: string;
  progress: number;
  isAnalyzing: boolean;
}