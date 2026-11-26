import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ResumeAnalysisRequest, ResumeAnalysisResponse } from "@shared/schema";
import ResumeInput from "@/components/resume-input";
import JobSelector from "@/components/job-selector";
import ResultsPanel from "@/components/results-panel";
import LoadingOverlay from "@/components/loading-overlay";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [resumeText, setResumeText] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResponse | null>(null);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const analyzeResumeMutation = useMutation({
    mutationFn: async (data: ResumeAnalysisRequest) => {
      const response = await apiRequest("POST", "/api/analyze-resume", data);
      const responseData = await response.json() as ResumeAnalysisResponse;
      return responseData;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "An error occurred while analyzing your resume.",
        variant: "destructive",
      });
    },
  });

  // Handle the resume analysis request
  const handleAnalyzeResume = (request: ResumeAnalysisRequest) => {
    analyzeResumeMutation.mutate(request);
  };

  // Handle title click - scroll to top and reset
  const handleTitleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAnalysisResult(null);
    setResumeText("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black theme-transition">
      <header className="container mx-auto max-w-7xl px-4 pt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={handleTitleClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="" className="h-7 w-7 rounded-md" />
          <span className="text-base font-semibold text-gray-900 dark:text-white">H1RE</span>
        </button>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 pt-10 pb-8">
        {/* Loading Overlay */}
        {analyzeResumeMutation.isPending && <LoadingOverlay />}

        {!resumeText && !analyzeResumeMutation.isPending && !analysisResult && (
          <motion.div
            className="mx-auto mb-8 max-w-2xl text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="mb-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Check your resume against the job you want
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Upload a PDF or DOCX, pick a role, and get scores for grammar, ATS fit and keywords with concrete fixes.
            </p>
          </motion.div>
        )}

        {/* Conditional rendering based on analysis state */}
        <AnimatePresence mode="wait">
          {/* Case 1: No Analysis - Center Resume Input */}
          {!analysisResult && (
            <motion.div 
              key="centered-input"
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Input Section */}
              <div className="flex flex-col space-y-6">
                {/* Resume Input Component */}
                <ResumeInput 
                  id="upload-section"
                  resumeText={resumeText} 
                  setResumeText={setResumeText} 
                />
                
                {/* Job Role Selection Component */}
                <JobSelector 
                  resumeText={resumeText}
                  onAnalyze={handleAnalyzeResume}
                  isAnalyzing={analyzeResumeMutation.isPending}
                />
              </div>
            </motion.div>
          )}
          
          {/* Case 2: With Analysis - Vertical layout with results on top */}
          {analysisResult && (
            <motion.div 
              key="vertical-layout"
              className="flex flex-col gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Top Section: Results Section (Full Width) */}
              <motion.div
                ref={resultsRef}
                id="analysis-results"
                className="w-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ResultsPanel 
                  result={analysisResult} 
                  resumeText={resumeText}
                  onNewAnalysis={handleTitleClick}
                />
              </motion.div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Custom Footer */}
      <Footer />
    </div>
  );
}

export default Home;
