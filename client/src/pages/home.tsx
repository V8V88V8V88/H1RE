import { useState, useEffect } from "react";
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
import { FileIcon, BarChart2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [resumeText, setResumeText] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResponse | null>(null);
  const { toast } = useToast();
  
  const analyzeResumeMutation = useMutation({
    mutationFn: async (data: ResumeAnalysisRequest) => {
      const response = await apiRequest("POST", "/api/analyze-resume", data);
      return response.json() as Promise<ResumeAnalysisResponse>;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });
    },
    onError: (error) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black theme-transition">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 apple-glass-light py-4 px-4 shadow-sm border-b border-gray-200/20 dark:border-white/5 theme-transition"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="h-6 w-6 text-[#0078d4]" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#0078d4] to-[#50b0ff] bg-clip-text text-transparent">
              Resume Analyzer AI
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
            className="mx-auto mb-12 max-w-4xl apple-card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <motion.h2 
                className="mb-2 text-3xl font-bold bg-gradient-to-r from-[#0078d4] to-[#50b0ff] bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Welcome to Resume Analyzer AI
              </motion.h2>
              <motion.p 
                className="mb-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Get instant AI-powered feedback on your resume's quality and effectiveness. 
                Optimize your resume for your dream job with detailed analysis and recommendations.
              </motion.p>
              
              {/* Sample Resume Card */}
              <SampleResume />
              
              <motion.div 
                className="mx-auto mb-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-col items-center apple-card p-5 theme-transition hover-scale contrast-card">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0078d4]/20 text-[#0078d4]">
                    <FileIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 font-medium">Upload Resume</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-300">Upload your resume in PDF or DOCX format</p>
                </div>
                
                <div className="flex flex-col items-center apple-card p-5 theme-transition hover-scale contrast-card">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0078d4]/20 text-[#0078d4]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 22h9a2 2 0 0 0 2-2V7l-5-5H9a2 2 0 0 0-2 2v4"></path><path d="M3 15h6"></path><path d="M8 18v-6"></path><path d="M3 18h8"></path></svg>
                  </div>
                  <h3 className="mb-1 font-medium">Choose Job Role</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-300">Select your target position for relevant feedback</p>
                </div>
                
                <div className="flex flex-col items-center apple-card p-5 theme-transition hover-scale contrast-card">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0078d4]/20 text-[#0078d4]">
                    <BarChart2 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 font-medium">Get Analysis</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-300">Receive detailed feedback to improve your resume</p>
                </div>
              </motion.div>
              
              <motion.button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl bg-[#0078d4] px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg hover:bg-[#0078d4]/90 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 dark:focus:ring-offset-black"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                Get Started
              </motion.button>
            </div>
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
          
          {/* Case 2: With Analysis - 2-column layout */}
          {analysisResult && (
            <motion.div 
              key="two-column-layout"
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Column: Input Section */}
              <motion.div 
                className="flex flex-col space-y-6"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
              
              {/* Right Column: Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ResultsPanel result={analysisResult} />
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
