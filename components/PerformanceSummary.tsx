'use client'
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Clock,
  MemoryStick,
} from "lucide-react";
import { PerformanceMetrics } from "../types";
import { useTheme } from "next-themes";

interface PerformanceSummaryProps {
  score: number;
  status: "excellent" | "good" | "fair" | "poor";
  metrics: PerformanceMetrics;
}

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  score,
  status,
  metrics,
}) => {
  const getGradientColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "scoreGradientExcellent";
      case "good":
        return "scoreGradientGood";
      case "fair":
        return "scoreGradientFair";
      case "poor":
        return "scoreGradientPoor";
      default:
        return "scoreGradientDefault";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-600 text-green-50 border-green-300 dark:bg-green-900 dark:border-green-500";
      case "good":
        return "bg-teal-600 text-teal-50 border-teal-300 dark:bg-teal-900 dark:border-teal-500";
      case "fair":
        return "bg-yellow-600 text-yellow-50 border-yellow-300 dark:bg-yellow-900 dark:border-yellow-500";
      case "poor":
        return "bg-red-600 text-red-50 border-red-300 dark:bg-red-900 dark:border-red-500";
      default:
        return "bg-gray-500 text-gray-50 border-gray-500 dark:bg-gray-900 dark:border-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "good":
        return <CheckCircle className="w-6 h-6 text-teal" />;
      case "fair":
        return <AlertTriangle className="w-6 h-6 text-warning" />;
      case "poor":
        return <XCircle className="w-6 h-6 text-alert" />;
      default:
        return <Activity className="w-6 h-6 600" />;
    }
  };

  const getScoreColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-400";
      case "good":
        return "text-blue-400";
      case "fair":
        return "text-yellow-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);
  
    useEffect(() => {
      if (theme === "dark") setIsDark(true);
      else if (theme === "light") setIsDark(false);
      else if (theme === "system") {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    }, [theme]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient
                id="scoreGradientExcellent"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient
                id="scoreGradientGood"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient
                id="scoreGradientFair"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
              <linearGradient
                id="scoreGradientPoor"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
              <linearGradient
                id="scoreGradientDefault"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#6b7280" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={`${isDark ? '#2f3436' : '#555'} `}
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={`url(#${getGradientColor(status)})`}
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${(score / 100) * 283} 283`}
              className="text-teal transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(status)}`}>
              {score}
            </span>
          </div>
        </div>

        <div
          className={`shadow-lg hover:shadow-xl transition ease-in inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(
            status
          )}`}
        >
          {getStatusIcon(status)}
          <span className="ml-2 capitalize">{status} Performance</span>
        </div>
      </div>

      <div className="space-y-4 text-card-foreground">
        <div className="flex items-center justify-between p-4 bg-card border border-border shadow-md hover:shadow-xl dark:hover:border-accent rounded-lg transition-all ease-in-out duration-300">
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-3" />
            <span className="font-medium">Average FPS</span>
          </div>
          <span className="font-semibold">{metrics.averageFps.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-card border border-border shadow-md hover:shadow-xl dark:hover:border-accent rounded-lg ease-in-out duration-300">
          <div className="flex items-center">
            <Clock className="w-5 h-5  mr-3" />
            <span className="font-medium ">Frame Time Variance</span>
          </div>
          <span className="font-semibold ">
            {metrics.frameTimeVariance && metrics.frameTimeVariance.toFixed(2)} ms
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-card border border-border shadow-md hover:shadow-xl dark:hover:border-accent rounded-lg ease-in-out duration-300">
          <div className="flex items-center">
            <MemoryStick className="w-5 h-5 600 mr-3" />
            <span className="font-medium ">Avg Memory Usage</span>
          </div>
          <span className="font-semibold ">
            {metrics.memoryUsage && (
              metrics.memoryUsage.reduce((a, b) => a + b, 0) /
              metrics.memoryUsage.length
            ).toFixed(1)} MB
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-card border border-border shadow-md hover:shadow-xl dark:hover:border-accent rounded-lg ease-in-out duration-300">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-3" />
            <span className="font-medium ">Lag Spikes Detected</span>
          </div>
          <span className="font-semibold ">{metrics.lagSpikes && metrics.lagSpikes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
