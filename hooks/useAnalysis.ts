import { AnalysisContext } from "@/context/AnalysisProvider";
import { useContext } from "react";

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
