import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ResumeAnalysisRequest, ResumeAnalysisResponse } from "@shared/schema";
import ResumeInput from "@/components/resume-input";
import JobSelector from "@/components/job-selector";
import ResultsPanel from "@/components/results-panel";
import LoadingOverlay from "@/components/loading-overlay";
import { FileIcon, BarChart2 } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 shadow-sm">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Real-Time Resume Evaluator</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
        {/* Loading Overlay */}
        {analyzeResumeMutation.isPending && <LoadingOverlay />}

        {/* Welcome Card - Only visible when no resume is uploaded */}
        {!resumeText && !analyzeResumeMutation.isPending && !analysisResult && (
          <div className="mx-auto mb-8 max-w-4xl rounded-xl bg-white dark:bg-gray-800 p-8 shadow-md">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold">Welcome to Resume Evaluator</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Get instant AI-powered feedback on your resume's quality and effectiveness
              </p>
              
              <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-medium">Upload Resume</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">Upload your resume in PDF or DOCX format</p>
                </div>
                
                <div className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 22h9a2 2 0 0 0 2-2V7l-5-5H9a2 2 0 0 0-2 2v4"></path><path d="M3 15h6"></path><path d="M8 18v-6"></path><path d="M3 18h8"></path></svg>
                  </div>
                  <h3 className="mb-1 font-medium">Choose Job Role</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">Select your target position for relevant feedback</p>
                </div>
                
                <div className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-medium">Get Analysis</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">Receive detailed feedback to improve your resume</p>
                </div>
              </div>
              
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                Get Started
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Input Section */}
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
          
          {/* Right Column: Results Section */}
          {analysisResult && (
            <ResultsPanel result={analysisResult} />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Real-Time Resume Evaluator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
