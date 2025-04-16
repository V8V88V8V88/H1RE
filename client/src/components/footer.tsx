import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";

export function Footer() {
  return (
    <motion.footer 
      className="mt-16 py-8 border-t border-white/5 backdrop-blur-xl theme-transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              Made with 💙 by{" "}
              <a 
                href="https://v8v88v8v88.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-primary/90 hover:text-primary transition-colors"
              >
                v8v88v8v88
              </a>
            </span>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-black/60 theme-transition"
              >
                About this project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-xl border-white/10 backdrop-blur-xl bg-black/80 shadow-xl theme-transition">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent pb-1">
                  Resume Analyzer AI
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-300">
                  An intelligent resume evaluation tool
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-6 text-sm text-gray-300">
                <p>
                  Resume Analyzer AI is a cutting-edge web application that helps job seekers optimize their resumes for specific job roles and experience levels. 
                  Using the power of Google's Gemini AI, it provides comprehensive analysis and actionable feedback in several key areas:
                </p>
                
                <div className="space-y-3 pl-4">
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> 
                    <span><span className="font-semibold text-white">Grammar & Readability</span> - Catches errors and improves clarity</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> 
                    <span><span className="font-semibold text-white">ATS Compatibility</span> - Ensures your resume passes automated screening systems</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> 
                    <span><span className="font-semibold text-white">Keyword Analysis</span> - Identifies missing important keywords for your target role</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span> 
                    <span><span className="font-semibold text-white">Smart Recommendations</span> - Provides actionable suggestions to improve your chances</span>
                  </p>
                </div>
                
                <p>
                  The app features a clean, modern interface with real-time analysis, detailed feedback, and a gamified scoring system to track your progress.
                </p>

                <p className="text-xs text-gray-500 pt-2">
                  Built with React, TypeScript, Tailwind CSS, and Shadcn/UI components. 
                  Powered by Google Gemini 2.0-Flash AI.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.footer>
  );
}