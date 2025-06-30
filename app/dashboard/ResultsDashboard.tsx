"use client";
import React, { useState } from "react";
import { AnalysisResult } from "@/types";
import PerformanceSummary from "@/components/PerformanceSummary";
import IssuesList from "@/components/IssuesList";
import MetricsVisualization from "@/components/MetricsVisualization";
import Recommendations from "@/components/Recommendations";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";

interface ResultsDashboardProps {
  results: AnalysisResult;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "issues" | "metrics" | "recommendations"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "issues", label: "Issues", count: results.issues.length },
    { id: "metrics", label: "Metrics", count: null },
    {
      id: "recommendations",
      label: "Recommendations",
      count: results.recommendations.length,
    },
  ] as const;

  return (
    <div className="rounded-lg shadow-card mb-8">
      <div className="border-b border-border max-sm:hidden">
        <nav
          className="flex space-x-8 px-8"
          aria-label="Analysis results navigation"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center h-7 px-4 py-1.5 gap-1.5 text-sm font-semibold capitalize text-center transition-colors
              ease-in border-b-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring
              hover:text-foreground hover:border-secondary cursor-pointer
              ${
                activeTab === tab.id
                  ? "text-foreground border-secondary"
                  : "text-muted-foreground border-transparent"
              }
            `}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-muted text-foreground">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="sm:hidden">
        <Select
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(
              value as "overview" | "issues" | "metrics" | "recommendations"
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Overview" />
          </SelectTrigger>

          <AnimatePresence>
            <SelectContent position="popper" sideOffset={6}>
              {/* Ensure motion.div wraps everything directly */}
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <SelectGroup>
                  {tabs.map((tab) => (
                    <SelectItem key={tab.id} value={tab.id}>
                      <div className="flex items-center justify-between w-full">
                        <span className="capitalize">{tab.label}</span>
                        {tab.count !== null && (
                          <span
                            className="ml-2 py-0.5 px-2 rounded-full text-xs bg-muted text-foreground"
                          >
                            {tab.count}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </motion.div>
            </SelectContent>
          </AnimatePresence>
        </Select>
      </div>

      <div className="p-8">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PerformanceSummary
                score={results.overallScore}
                status={results.status}
                metrics={results.metrics}
              />
            </div>
            <div className="lg:col-span-2">
              <MetricsVisualization metrics={results.metrics} />
            </div>
          </div>
        )}

        {activeTab === "issues" && <IssuesList issues={results.issues} />}

        {activeTab === "metrics" && (
          <MetricsVisualization metrics={results.metrics} />
        )}

        {activeTab === "recommendations" && (
          <Recommendations recommendations={results.recommendations} />
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
