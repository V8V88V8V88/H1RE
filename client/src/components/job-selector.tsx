import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeAnalysisRequest } from "@shared/schema";
import { Search } from "lucide-react";

interface JobSelectorProps {
  resumeText: string;
  onAnalyze: (request: ResumeAnalysisRequest) => void;
  isAnalyzing: boolean;
}

const JobSelector = ({ resumeText, onAnalyze, isAnalyzing }: JobSelectorProps) => {
  const [selectedJobRole, setSelectedJobRole] = useState<string>("");
  const [customJobRole, setCustomJobRole] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("mid");

  const handleRoleChange = (value: string) => {
    setSelectedJobRole(value);
    if (value !== "custom") {
      setCustomJobRole("");
    }
  };

  const handleAnalyzeClick = () => {
    if (!canAnalyze) return;
    
    onAnalyze({
      resumeText,
      jobRole: selectedJobRole,
      customJobRole: selectedJobRole === "custom" ? customJobRole : undefined,
      experienceLevel: experienceLevel as "fresher" | "entry" | "mid" | "senior" | "executive",
    });
  };

  const canAnalyze = resumeText.trim().length > 0 && 
                     (selectedJobRole && selectedJobRole !== "custom" || 
                      selectedJobRole === "custom" && customJobRole.trim().length > 0);

  return (
    <div className="apple-card shadow-xl theme-transition">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Job Role Selection</h2>
        
        <div className="mb-4">
          <Label htmlFor="job-role" className="mb-2 block text-gray-900 dark:text-white">
            Target Position
          </Label>
          <Select value={selectedJobRole} onValueChange={handleRoleChange}>
            <SelectTrigger 
              id="job-role" 
              className="rounded-xl border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078d4]/20 focus:border-[#0078d4] focus:ring-offset-0"
            >
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
              <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
              <SelectItem value="backend-developer">Backend Developer</SelectItem>
              <SelectItem value="full-stack-developer">Full Stack Developer</SelectItem>
              <SelectItem value="data-scientist">Data Scientist</SelectItem>
              <SelectItem value="data-analyst">Data Analyst</SelectItem>
              <SelectItem value="product-manager">Product Manager</SelectItem>
              <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
              <SelectItem value="project-manager">Project Manager</SelectItem>
              <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
              <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
              <SelectItem value="qa-engineer">QA Engineer</SelectItem>
              <SelectItem value="cloud-architect">Cloud Architect</SelectItem>
              <SelectItem value="cybersecurity-analyst">Cybersecurity Analyst</SelectItem>
              <SelectItem value="machine-learning-engineer">Machine Learning Engineer</SelectItem>
              <SelectItem value="blockchain-developer">Blockchain Developer</SelectItem>
              <SelectItem value="mobile-developer">Mobile Developer</SelectItem>
              <SelectItem value="system-administrator">System Administrator</SelectItem>
              <SelectItem value="technical-writer">Technical Writer</SelectItem>
              <SelectItem value="custom">Other (Custom)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Custom Role Input */}
        {selectedJobRole === "custom" && (
          <div className="mb-4">
            <Label htmlFor="custom-role" className="mb-2 block text-gray-900 dark:text-white">
              Specify Custom Role
            </Label>
            <Input 
              id="custom-role" 
              value={customJobRole}
              onChange={(e) => setCustomJobRole(e.target.value)}
              placeholder="e.g. Blockchain Developer"
              className="rounded-xl border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078d4]/20 focus:border-[#0078d4]"
            />
          </div>
        )}
        
        {/* Experience Level */}
        <div className="mb-6">
          <Label htmlFor="experience-level" className="mb-2 block text-gray-900 dark:text-white">
            Experience Level
          </Label>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger 
              id="experience-level" 
              className="rounded-xl border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0078d4]/20 focus:border-[#0078d4] focus:ring-offset-0 transition-all"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
              <SelectItem value="fresher">Fresher (No experience)</SelectItem>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
              <SelectItem value="executive">Executive Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Analysis Button */}
        <Button 
          onClick={handleAnalyzeClick}
          disabled={!canAnalyze || isAnalyzing}
          className="w-full rounded-xl bg-[#0078d4] hover:bg-[#0066b3] text-white shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="mr-2 h-4 w-4" /> 
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>
    </div>
  );
};

export default JobSelector;
