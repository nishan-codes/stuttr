"use client";
import { AnalysisResult } from "@/types";
import ResultsDashboard from "../ResultsDashboard";
import { useAnalyzeStore } from "@/stores/analyzeStore";
import { useUser } from "@clerk/nextjs";
import { saveDashboard } from "@/lib/actions/actions";
import Dialog03 from "@/components/dialog-1";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { motion } from "framer-motion";

const Dashboard = ({ initialData }) => {
  const { setAnalyzeData, analyzeData, currentDashboardId, dashboardTitle } =
    useAnalyzeStore();
  const dashboardId = currentDashboardId;
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchDashboard = () => {
      try {
        setLoading(true);
        const data = initialData || analyzeData;
        setAnalyzeData(data);
        setSaved(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (
      !analyzeData ||
      !("overallScore" in analyzeData) ||
      !("status" in analyzeData) ||
      !("issues" in analyzeData) ||
      !("metrics" in analyzeData) ||
      !("recommendations" in analyzeData)
    ) {
      fetchDashboard();
    }
  }, [dashboardId, analyzeData, setAnalyzeData]);

  if (loading) {
    return (
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
            Loading From DB...
          </TextShimmerWave>
        </div>
      </motion.div>
    );
  }

  if (
    !analyzeData ||
    !("overallScore" in analyzeData) ||
    !("status" in analyzeData) ||
    !("issues" in analyzeData) ||
    !("metrics" in analyzeData) ||
    !("recommendations" in analyzeData)
  ) {
    return <div>Couldnt be found</div>;
  }

  // console.log(analyzeData);
  const analysisResult = analyzeData as AnalysisResult;

  const handleSave = async () => {
    try {
      if (!user) return alert("Please log in first.");
      setSaved(true);
      await saveDashboard(
        dashboardId,
        user.id,
        dashboardTitle,
        analyzeData as AnalysisResult
      );
    } catch (err) {
      alert("Failed to save" + err);
    }
  };

  return (
    <div className="container mx-auto min-h-screen pt-20 px-6 text-2xl max-sm:text-sm max-sm:px-3 sm:text-lg">
      <div className="mx-auto flex items-center justify-between py-8 mb-8">
        <div className="flex flex-col relative">
          <h2 className="font-inter font-bold text-foreground mb-2">
            Performance Analysis Results
          </h2>
          <p className="text-foreground/90">
            Analyzed: sample.csv • 6/24/2025{" "}
            {/*  {selectedFile?.name} • {new Date().toLocaleDateString()} */}
          </p>
        </div>
        {/* <Button onClick={saveToDB} variant="outline">
          Save To DB
        </Button> */}
        <div>
          {saved ? (
            <Button disabled>Saved!</Button>
          ) : (
            <Dialog03 handleSave={handleSave} />
          )}
        </div>
      </div>

      <ResultsDashboard results={analysisResult} />
    </div>
  );
};

export default Dashboard;
