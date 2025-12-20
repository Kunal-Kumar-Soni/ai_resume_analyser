"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type AnalysisContextType = {
  analysisData: string | null | undefined;
  setAnalysisData: Dispatch<SetStateAction<string | null | undefined>>;
  isAnalysisDataLoading: boolean;
  setIsAnalysisDataLoading: Dispatch<SetStateAction<boolean>>;
};

export const AnalysisContext = createContext<AnalysisContextType | null>(null);

type AnalysisProviderProps = {
  children: React.ReactNode;
};

const AnalysisProvider = ({ children }: AnalysisProviderProps) => {
  const [analysisData, setAnalysisData] = useState<string | null | undefined>(null);
  const [isAnalysisDataLoading, setIsAnalysisDataLoading] = useState<boolean>(false);

  const totalData = {
    analysisData,
    setAnalysisData,
    isAnalysisDataLoading,
    setIsAnalysisDataLoading,
  };
  return <AnalysisContext.Provider value={totalData}>{children}</AnalysisContext.Provider>;
};

export default AnalysisProvider;
