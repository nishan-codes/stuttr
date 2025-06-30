"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
} from "chart.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Calendar } from "lucide-react";
import { PerformanceMetrics } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricsVisualizationProps {
  metrics: PerformanceMetrics;
}

const MetricsVisualization: React.FC<MetricsVisualizationProps> = ({
  metrics,
}) => {
  const [timeRange, setTimeRange] = useState<"all" | "1h" | "30m" | "10m">(
    "all"
  );
  const [selectedMetric, setSelectedMetric] = useState<
    "fps" | "memory" | "cpu"
  >("fps");

  const getFilteredData = () => {
    const totalPoints = metrics.timestamps.length;
    let startIndex = 0;

    switch (timeRange) {
      case "10m":
        startIndex = Math.max(0, totalPoints - 600); // 10 minutes worth of data points
        break;
      case "30m":
        startIndex = Math.max(0, totalPoints - 1800);
        break;
      case "1h":
        startIndex = Math.max(0, totalPoints - 3600);
        break;
      default:
        startIndex = 0;
    }
    return {
      timestamps: metrics.timestamps.slice(startIndex),
      fps: metrics.fps.slice(startIndex),
      memoryUsage: metrics.memoryUsage.slice(startIndex),
      cpuUsage: metrics.cpuUsage.slice(startIndex),
    };
  };

  const filteredData = getFilteredData();

  const getChartData = () => {
    const baseConfig = {
      labels: filteredData.timestamps.map((ts) =>
        new Date(ts).toLocaleTimeString()
      ),
      datasets: [],
    };

    switch (selectedMetric) {
      case "fps":
        return {
          ...baseConfig,
          datasets: [
            {
              label: "FPS",
              data: filteredData.fps,
              borderColor: "#1ABC9C",
              backgroundColor: "rgba(26, 188, 156, 0.1)",
              tension: 0.4,
              pointRadius: 0,
              fill: true,
            },
          ],
        };

      case "memory":
        return {
          ...baseConfig,
          datasets: [
            {
              label: "Memory Usage (MB)",
              data: filteredData.memoryUsage,
              borderColor: "#F39C12",
              backgroundColor: "rgba(243, 156, 18, 0.1)",
              tension: 0.4,
              pointRadius: 0,
              fill: true,
            },
          ],
        };

      case "cpu":
        return {
          ...baseConfig,
          datasets: [
            {
              label: "CPU Usage (%)",
              data: filteredData.cpuUsage,
              borderColor: "#E74C3C",
              backgroundColor: "rgba(231, 76, 60, 0.1)",
              tension: 0.4,
              pointRadius: 0,
              fill: true,
            },
          ],
        };

      default:
        return baseConfig;
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

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#fff" : "#333",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
          color: isDark ? "#fff" : "#333",
        },
        ticks: {
          maxTicksLimit: 10,
          color: isDark ? "#fff" : "#333",
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: selectedMetric === "fps" ? "Frames per Second" : "Usage (%)",
          color: isDark ? "#fff" : "#333",
        },
        ticks: {
          maxTicksLimit: 6,
          color: isDark ? "#fff" : "#333",
        },
        grid: {
          color: isDark ? "oklch(0.708 0 0)" : "oklch(0.556 0 0)",
        },
        border: {
          color: isDark ? '#fff' : '#333'
        },
        min: 0,
        max: selectedMetric === "fps" 
        ? undefined 
        : selectedMetric === "memory" 
        ? 15000
        : 100,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const exportData = () => {
    const csvContent = [
      ["Timestamp", "Memory Usage (%)", "CPU Usage (%)"],
      ...filteredData.timestamps.map((timestamp, index) => [
        timestamp,
        filteredData.memoryUsage[index]?.toString() || "0",
        filteredData.cpuUsage[index]?.toString() || "0",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `performance-metrics-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Performance Metrics
        </h3>

        <div className="flex flex-col sm:flex-row max-sm:w-full gap-3">
          <Select
            value={selectedMetric}
            onValueChange={(value) =>
              setSelectedMetric(value as "fps" | "memory" | "cpu")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="FPS" />
            </SelectTrigger>
            <AnimatePresence>
              <SelectContent
                position="popper"
                sideOffset={6}
                avoidCollisions={false}
              >
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <SelectGroup>
                    <SelectItem value="fps">FPS</SelectItem>
                    <SelectItem value="memory">Memory Usage</SelectItem>
                    <SelectItem value="cpu">CPU Usage</SelectItem>
                  </SelectGroup>
                </motion.div>
              </SelectContent>
            </AnimatePresence>
          </Select>

          <Select
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as "all" | "1h" | "30m" | "10m")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <AnimatePresence>
              <SelectContent
                position="popper"
                sideOffset={6}
                avoidCollisions={false}
              >
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <SelectGroup>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="10m">10m</SelectItem>
                    <SelectItem value="30m">30m</SelectItem>
                    <SelectItem value="1h">1h</SelectItem>
                  </SelectGroup>
                </motion.div>
              </SelectContent>
            </AnimatePresence>
          </Select>

          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="border-border bg-card border shadow-lg hover:shadow-xl dark:hover:border-accent transition-all ease-in rounded-md p-6">
        <div className="h-80">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </div>

      {metrics.lagSpikes.length > 0 && (
        <div className="bg-card border border-border rounded shadow-lg hover:shadow-xl dark:hover:border-accent transition-all ease-in-out p-6">
          <h4 className="text-lg font-bold text-destructive mb-4">
            Lag Spikes Detected
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.lagSpikes.slice(0, 6).map((spike, index) => (
              <div
                key={index}
                className="border border-red-300 dark:border-red-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-4 h-4 dark:text-red-100" />
                  <span className="text-sm font-medium text-destructive">
                    Severity: {spike.severity}/10
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-200 mb-1">
                  Time: {new Date(spike.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  Duration: {spike.duration}ms
                </p>
              </div>
            ))}
          </div>
          {metrics.lagSpikes.length > 6 && (
            <p className="text-sm text-red-700 mt-4">
              And {metrics.lagSpikes.length - 6} more lag spikes...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricsVisualization;
