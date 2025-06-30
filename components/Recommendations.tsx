"use client";
import React, { useState } from "react";
import {
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Check,
  Settings,
  Download,
  Zap,
  HardDrive,
  X,
  Thermometer,
  Monitor,
  Cpu,
  MemoryStick,
  Wifi,
  Shield,
  AlertTriangle,
  TrendingUp,
  Database,
  Globe,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Recommendation } from "../types";
import { AnimatePresence, motion } from "framer-motion";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

// Icon mapping object to replace dynamic require() calls
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
  {
    Settings,
    Download,
    Zap,
    HardDrive,
    X,
    Thermometer,
    Monitor,
    Cpu,
    MemoryStick,
    Wifi,
    Shield,
    AlertTriangle,
    TrendingUp,
    Database,
    Globe,
  };

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
}) => {
  const [expandedRecs, setExpandedRecs] = useState<Set<string>>(new Set());
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">(
    "all"
  );

  const toggleRecommendation = (recId: string) => {
    const newExpanded = new Set(expandedRecs);
    if (newExpanded.has(recId)) {
      newExpanded.delete(recId);
    } else {
      newExpanded.add(recId);
    }
    setExpandedRecs(newExpanded);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(new Set([...copiedItems, id]));
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (priority) {
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

  const getIconComponent = (iconName: string) => {
    // Get the icon component from the iconMap, fallback to Settings if not found
    const IconComponent = iconMap[iconName] || Settings;
    return <IconComponent className="w-5 h-5 text-teal" />;
  };

  const filteredRecommendations = recommendations
    .filter((rec) => filter === "all" || rec.priority === filter)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Performance Recommendations
        </h3>

        <div>
          <Select
            value={filter}
            onValueChange={(value) =>
              setFilter(value as "all" | "high" | "medium" | "low")
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
                    <SelectItem value="all">All Recommendations</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectGroup>
                </motion.div>
              </SelectContent>
            </AnimatePresence>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredRecommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="border border-border dark:hover:border-accent shadow-md hover:shadow-xl transition-all ease-in-out duration-300 rounded-lg bg-card"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getIconComponent(recommendation.icon)}
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {recommendation.title}
                    </h4>
                    <div className="flex flex-col min-[500px]:flex-row items-center min-[500px]:space-x-2 mt-1">
                      <span
                        className={getPriorityBadge(recommendation.priority)}
                      >
                        {recommendation.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-sm text-foreground">
                        {recommendation.category}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(
                      recommendation.description,
                      recommendation.id
                    )
                  }
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Copy recommendation"
                >
                  {copiedItems.has(recommendation.id) ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <p className="text-foreground mb-4">{recommendation.description}</p>

              <button
                onClick={() => toggleRecommendation(recommendation.id)}
                className="cursor-pointer inline-flex items-center text-foreground hover:text-foreground/80 font-medium text-sm transition-colors"
              >
                Learn more
                {expandedRecs.has(String(recommendation.id)) ? (
                  <ChevronDown className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-1" />
                )}
              </button>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: expandedRecs.has(recommendation.id) ? "auto" : 0,
                opacity: expandedRecs.has(recommendation.id) ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden px-6 border-t border-border"
            >
              <div className="pt-6 space-y-4">
                <div className="prose prose-sm text-sidebar-accent">
                  <p>{recommendation.learnmore}</p>
                </div>

                <div className="flex flex-col min-[500px]:flex-row items-center justify-between pt-4 pb-4 border-t border-border">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        recommendation.learnmore,
                        `${recommendation.id}-details`
                      )
                    }
                    className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-foreground/80 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900/50 dark:hover:bg-neutral-800 dark:border-neutral-600 transition-colors"
                  >
                    {copiedItems.has(`${recommendation.id}-details`) ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Details
                      </>
                    )}
                  </button>

                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 bg-teal text-foreground rounded-md text-sm font-medium hover:text-foreground/50 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8 text-primary">
          <Check className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No Recommendations
          </h3>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
