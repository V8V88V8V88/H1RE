import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  // Force dark mode on first load
  useEffect(() => {
    // Check for existing theme in localStorage or default to dark
    const savedTheme = localStorage.getItem("resume-analyzer-theme") as "light" | "dark" | null;
    const newTheme = savedTheme || "dark";
    
    setTheme(newTheme);
    updateTheme(newTheme);
    
    // Set dark mode by default if no theme is saved
    if (!savedTheme) {
      localStorage.setItem("resume-analyzer-theme", "dark");
    }
  }, []);
  
  // Function to update theme
  const updateTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    updateTheme(newTheme);
    localStorage.setItem("resume-analyzer-theme", newTheme);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full bg-background/50 backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`} />
        <Moon className={`absolute h-5 w-5 transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`} />
      </Button>
    </motion.div>
  );
}