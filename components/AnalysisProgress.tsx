import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { AnalysisProgress as AnalysisProgressType } from '../types';

interface AnalysisProgressProps {
  progress: AnalysisProgressType;
  onCancel: () => void;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, onCancel }) => {
  if (!progress.isAnalyzing) return null;

  return (
    <div className="bg-white rounded-lg shadow-card p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-inter font-semibold text-primary">Analyzing Performance</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cancel analysis"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-teal border-t-transparent animate-spin"
            style={{
              transform: `rotate(${(progress.progress / 100) * 360}deg)`,
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">{progress.progress}%</span>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Loader2 className="w-5 h-5 text-teal animate-spin mr-2" />
          <p className="text-lg font-medium text-gray-700">{progress.step}</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-teal h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;