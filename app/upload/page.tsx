"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import {
  GameLogFile,
  AnalysisResult,
  AnalysisProgress as AnalysisProgressType,
} from "@/types";
import { SparklesText } from "@/components/ui/sparkles-text";
import { FeatureStepsDemo } from "@/components/FeatureSection";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useAnalyzeStore } from "@/stores/analyzeStore";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const [analysisProgress, setAnalysisProgress] =
    useState<AnalysisProgressType>({
      step: "",
      progress: 0,
      isAnalyzing: false,
    });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  // GREAT LOGIC

  const router = useRouter();

  const { setAnalyzeData, setCurrentDashboardId } =
    useAnalyzeStore();

  //FILE UPLOAD KO LAGI AND CALLING API
  const uploadMutation = useMutation({
    mutationFn: async (file: GameLogFile) => {
      const formData = new FormData();
      formData.append("csvFile", file.file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to analyze");
      }

      return res.json();
    },
    onSuccess: (data) => {
      setAnalyzeData(data);
      const id = uuidv4();
      setCurrentDashboardId(id);
      router.push(`/dashboard/new`);
    },
    onError: (error) => {
      setAnalysisProgress({
        step: "",
        progress: 0,
        isAnalyzing: false,
      });
      alert(error.message || "Error during analysis");
    },
  });

  const handleFileSelect = (file: GameLogFile) => {
    setAnalysisResult(null);

    // Start analysis simulation
    setAnalysisProgress({
      step: "Initializing analysis...",
      progress: 0,
      isAnalyzing: true,
    });

    uploadMutation.mutate(file);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main
        className={`flex-1 ${analysisProgress.isAnalyzing ? "pt-0" : "pt-20"}`}
      >
        <div
          className={`${
            analysisProgress.isAnalyzing
              ? `
          h-dvh w-100vw flex items-center justify-center
          `
              : "container mx-auto px-3 py-8"
          }`}
        >
          {!analysisResult && !analysisProgress.isAnalyzing && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 30,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="leading-[0.6] text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-4">
                    <SparklesText text="Analyze" className="inline" /> Your Game
                    Performance
                  </h2>
                  <p className="text-lg font-work-sans font-medium max-w-2xl mx-auto">
                    Upload your
                    <span className="font-bold"> .CSV </span>
                    log file to get personalized insights and performance
                    reports.
                  </p>
                </motion.div>
              </div>

              <FileUpload
                onFileSelect={handleFileSelect}
                isAnalyzing={analysisProgress.isAnalyzing}
              />

              <FeatureStepsDemo />
            </div>
          )}

          {analysisProgress.isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
            >
              <div className="flex flex-col gap-2">
                <TextShimmerWave
                  className="font-mono max-sm:text-sm sm:text-lg md:text-2xl"
                  duration={1}
                >
                  Analysis On Progress...
                </TextShimmerWave>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
