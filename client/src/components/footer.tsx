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
      className="mt-16 py-8 border-t bg-black/5 backdrop-blur-xl dark:bg-zinc-950/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Made with 💙 by{" "}
              <a 
                href="https://v8v88v8v88.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold hover:text-primary transition-colors"
              >
                v8v88v8v88
              </a>
            </span>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                About this project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent pb-1">
                  Resume Analyzer AI
                </DialogTitle>
                <DialogDescription className="text-lg opacity-90">
                  An intelligent resume evaluation tool
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-6 text-sm">
                <p>
                  Resume Analyzer AI is a cutting-edge web application that helps job seekers optimize their resumes for specific job roles and experience levels. 
                  Using the power of Google's Gemini AI, it provides comprehensive analysis and actionable feedback in several key areas:
                </p>
                
                <div className="space-y-2 pl-4">
                  <p>✓ <span className="font-semibold">Grammar & Readability</span> - Catches errors and improves clarity</p>
                  <p>✓ <span className="font-semibold">ATS Compatibility</span> - Ensures your resume passes automated screening systems</p>
                  <p>✓ <span className="font-semibold">Keyword Analysis</span> - Identifies missing important keywords for your target role</p>
                  <p>✓ <span className="font-semibold">Smart Recommendations</span> - Provides actionable suggestions to improve your chances</p>
                </div>
                
                <p>
                  The app features a clean, modern interface with real-time analysis, detailed feedback, and a gamified scoring system to track your progress.
                </p>

                <p className="text-xs opacity-70 pt-2">
                  Built with React, TypeScript, Tailwind CSS, and Shadcn/UI components. 
                  Powered by Google Gemini AI.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.footer>
  );
}