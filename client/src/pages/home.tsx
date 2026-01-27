import { useState, useEffect, useRef } from "react";
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
import { SampleResume } from "@/components/sample-resume";
import { FileIcon, BarChart2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [resumeText, setResumeText] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResponse | null>(null);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const analyzeResumeMutation = useMutation({
    mutationFn: async (data: ResumeAnalysisRequest) => {
      console.log("Sending analysis request:", data);
      const response = await apiRequest("POST", "/api/analyze-resume", data);
      const responseData = await response.json() as ResumeAnalysisResponse;
      console.log("Received analysis response:", responseData);
      return responseData;
    },
    onSuccess: (data) => {
      console.log("Setting analysis result:", data);
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
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 apple-glass-light py-2 px-4 shadow-sm border-b border-gray-200/20 dark:border-white/5 theme-transition"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-opacity"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={handleTitleClick}
          >
            <Sparkles className="h-5 w-5 text-[#0078d4]" />
            <h1 className="text-lg font-bold text-[#0078d4] dark:text-white">
              H1RE
            </h1>
          </motion.div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
        {/* Loading Overlay */}
        {analyzeResumeMutation.isPending && <LoadingOverlay />}

        {/* Welcome Card - Only visible when no resume is uploaded */}
        {!resumeText && !analyzeResumeMutation.isPending && !analysisResult && (
          <motion.div 
            className="mx-auto mb-12 max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 
                  className="mb-4 text-4xl md:text-5xl font-bold text-[#0078d4] dark:text-white"
                >
                  Welcome to H1RE
                </h2>
                <p 
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                >
                  Get instant feedback on your resume's quality and effectiveness. 
                  <span className="block mt-2 text-base md:text-lg text-gray-500 dark:text-gray-400">
                    Optimize your resume for your dream job with detailed analysis and recommendations.
                  </span>
                </p>
              </motion.div>
            </div>
              
            {/* Sample Resume Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <SampleResume />
            </motion.div>
              
            <motion.div 
              className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div 
                className="flex flex-col items-center apple-card p-6 theme-transition contrast-card group cursor-default"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] group-hover:bg-[#0078d4]/20 dark:group-hover:bg-[#0078d4]/30 transition-colors">
                  <FileIcon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Upload Resume</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Upload your resume in PDF or DOCX format</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center apple-card p-6 theme-transition contrast-card group cursor-default"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] group-hover:bg-[#0078d4]/20 dark:group-hover:bg-[#0078d4]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 22h9a2 2 0 0 0 2-2V7l-5-5H9a2 2 0 0 0-2 2v4"></path><path d="M3 15h6"></path><path d="M8 18v-6"></path><path d="M3 18h8"></path></svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Choose Job Role</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Select your target position for relevant feedback</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center apple-card p-6 theme-transition contrast-card group cursor-default"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] group-hover:bg-[#0078d4]/20 dark:group-hover:bg-[#0078d4]/30 transition-colors">
                  <BarChart2 className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Get Analysis</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Receive detailed feedback to improve your resume</p>
              </motion.div>
            </motion.div>
              
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative rounded-xl bg-[#0078d4] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:bg-[#0066b3] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 dark:focus:ring-offset-black overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00a4ef] to-[#0078d4] opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.button>
            </motion.div>
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
