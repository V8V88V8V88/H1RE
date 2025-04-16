import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  // Check if the system preference is dark mode
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set dark mode on first load
  useEffect(() => {
    // Set dark mode as default
    if (!("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </motion.div>
  );
}