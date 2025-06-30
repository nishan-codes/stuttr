"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { Issue } from "../types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";

interface IssuesListProps {
  issues: Issue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"severity" | "category">("severity");

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues);
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId);
    } else {
      newExpanded.add(issueId);
    }
    setExpandedIssues(newExpanded);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-alert" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "low":
        return <Info className="w-5 h-5 text-teal" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (severity) {
      case "high":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "medium":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "low":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredIssues = issues
    .filter((issue) => filter === "all" || issue.severity === filter)
    .sort((a, b) => {
      if (sortBy === "severity") {
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return a.category.localeCompare(b.category);
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold text-destructive">
          Performance Issues
        </h3>

        <div className="flex gap-3">
          <Select
            value={filter}
            onValueChange={(value) =>
              setFilter(value as "all" | "high" | "medium" | "low")
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
                    <SelectItem value="all">All Issues</SelectItem>
                    <SelectItem value="low">Low Severity</SelectItem>
                    <SelectItem value="medium">Medium Severity</SelectItem>
                    <SelectItem value="high">High Severity</SelectItem>
                  </SelectGroup>
                </motion.div>
              </SelectContent>
            </AnimatePresence>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value) =>
              setSortBy(value as "severity" | "category")
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
                    <SelectItem value="severity">Sort by Severity</SelectItem>
                    <SelectItem value="category">Sort by Category</SelectItem>
                  </SelectGroup>
                </motion.div>
              </SelectContent>
            </AnimatePresence>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-card border border-destructive/30 shadow-sm hover:shadow-lg transition-all ease-in-out duration-300 rounded-lg"
          >
            <button
            // border-b
              onClick={() => toggleIssue(issue.id)}
              className="rounded-lg cursor-pointer w-full px-6 py-4 text-left bg-card popover-background hover:bg-card/90  border-destructive/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSeverityIcon(issue.severity)}
                  <div>
                    <h4 className="font-medium text-foreground">{issue.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={getSeverityBadge(issue.severity)}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-foreground">
                        {issue.category}
                      </span>
                    </div>
                  </div>
                </div>
                {expandedIssues.has(issue.id) ? (
                  <ChevronDown className="w-5 h-5 text-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-foreground" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expandedIssues.has(issue.id) && (
                <motion.div
                  key={`expanded-${issue.id}`}
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 300 }} // Set a reasonable max height
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-x-4 border-t border-destructive dark:border-red-900 rounded-lg px-3 py-4 space-y-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2">
                       • Description
                      </h5>
                      <p>{issue.description}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-2">• Impact</h5>
                      <p>{issue.impact}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center text-primary py-8">
          <CheckCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No Issues Found
          </h3>
        </div>
      )}
    </div>
  );
};

export default IssuesList;
