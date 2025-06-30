import { create } from "zustand";

type AnalyzeData = {
  result: string;
  stats: Record<string, unknown>;
};

type AnalyzeStore = {
  currentDashboardId: string | null;
  analyzeData: AnalyzeData | null;
  isAnalyzing: boolean;
  dashboardTitle: string;
  setAnalyzeData: (data: AnalyzeData) => void;
  startAnalyzing: () => void;
  setDashboardTitle: (title: string) => void;
  setCurrentDashboardId: (id: string | null) => void;
};

export const useAnalyzeStore = create<AnalyzeStore>((set) => ({
  currentDashboardId: null,
  analyzeData: null,
  isAnalyzing: false,
  dashboardTitle: "",
  setAnalyzeData: (data) =>
    set({
      analyzeData: data,
      isAnalyzing: false,
    }),
  startAnalyzing: () => set({ isAnalyzing: true }),
  setDashboardTitle: (title: string) => set({ dashboardTitle: title }),
  setCurrentDashboardId: (id) => set({ currentDashboardId: id }),
}));
