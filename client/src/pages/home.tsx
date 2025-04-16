import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ResumeAnalysisRequest, ResumeAnalysisResponse } from "@shared/schema";
import ResumeInput from "@/components/resume-input";
import JobSelector from "@/components/job-selector";
import ResultsPanel from "@/components/results-panel";
import LoadingOverlay from "@/components/loading-overlay";
import { Footer } from "@/components/footer";
import { FileIcon, BarChart2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 py-4 px-4 shadow-sm"
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
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Resume Analyzer AI
            </h1>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
        {/* Loading Overlay */}
        {analyzeResumeMutation.isPending && <LoadingOverlay />}

        {/* Welcome Card - Only visible when no resume is uploaded */}
        {!resumeText && !analyzeResumeMutation.isPending && !analysisResult && (
          <motion.div 
            className="mx-auto mb-12 max-w-4xl rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 shadow-lg border border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <motion.h2 
                className="mb-2 text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Welcome to Resume Analyzer AI
              </motion.h2>
              <motion.p 
                className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Get instant AI-powered feedback on your resume's quality and effectiveness. 
                Optimize your resume for your dream job with detailed analysis and recommendations.
              </motion.p>
              
              <motion.div 
                className="mx-auto mb-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div 
                  className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 font-medium">Upload Resume</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">Upload your resume in PDF or DOCX format</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 22h9a2 2 0 0 0 2-2V7l-5-5H9a2 2 0 0 0-2 2v4"></path><path d="M3 15h6"></path><path d="M8 18v-6"></path><path d="M3 18h8"></path></svg>
                  </div>
                  <h3 className="mb-1 font-medium">Choose Job Role</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">Select your target position for relevant feedback</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BarChart2 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 font-medium">Get Analysis</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">Receive detailed feedback to improve your resume</p>
                </motion.div>
              </motion.div>
              
              <motion.button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Left Column: Input Section */}
          <motion.div 
            className="flex flex-col space-y-6"
            initial={{ x: -20 }}
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
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ResultsPanel result={analysisResult} />
            </motion.div>
          )}
        </motion.div>
      </main>
      
      {/* Custom Footer */}
      <Footer />
    </div>
  );
}

export default Home;
