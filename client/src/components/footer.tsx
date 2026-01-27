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
      className="mt-16 py-8 border-t border-zinc-800 theme-transition"
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
                className="rounded-full bg-gray-900 dark:bg-zinc-900 border-gray-700 dark:border-zinc-800 hover:border-gray-600 dark:hover:border-zinc-700 hover:bg-gray-800 dark:hover:bg-zinc-800 text-white dark:text-white theme-transition"
              >
                About this project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-xl border-zinc-800 bg-zinc-900 shadow-xl theme-transition">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white pb-1">
                  H1RE
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-300">
                  An intelligent resume evaluation tool
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-6 text-sm text-gray-300">
                <p>
                  H1RE is a cutting-edge web application that helps job seekers optimize their resumes for specific job roles and experience levels. 
                  It provides comprehensive analysis and actionable feedback in several key areas:
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
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.footer>
  );
}