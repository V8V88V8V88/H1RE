import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      experienceLevel: experienceLevel as "entry" | "mid" | "senior" | "executive",
    });
  };

  const canAnalyze = resumeText.trim().length > 0 && 
                     (selectedJobRole && selectedJobRole !== "custom" || 
                      selectedJobRole === "custom" && customJobRole.trim().length > 0);

  return (
    <div className="apple-card shadow-xl theme-transition">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Job Role Selection</h2>
        
        <div className="mb-4">
          <Label htmlFor="job-role" className="mb-2 block">
            Target Position
          </Label>
          <Select value={selectedJobRole} onValueChange={handleRoleChange}>
            <SelectTrigger 
              id="job-role" 
              className="apple-glass rounded-xl theme-transition border-white/10 focus:ring-primary/50 focus:border-primary/50"
            >
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-white/10 bg-black/90 backdrop-blur-xl">
              <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
              <SelectItem value="backend-developer">Backend Developer</SelectItem>
              <SelectItem value="full-stack-developer">Full Stack Developer</SelectItem>
              <SelectItem value="data-scientist">Data Scientist</SelectItem>
              <SelectItem value="data-analyst">Data Analyst</SelectItem>
              <SelectItem value="product-manager">Product Manager</SelectItem>
              <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
              <SelectItem value="project-manager">Project Manager</SelectItem>
              <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
              <SelectItem value="custom">Other (Custom)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Custom Role Input */}
        {selectedJobRole === "custom" && (
          <div className="mb-4">
            <Label htmlFor="custom-role" className="mb-2 block">
              Specify Custom Role
            </Label>
            <Input 
              id="custom-role" 
              value={customJobRole}
              onChange={(e) => setCustomJobRole(e.target.value)}
              placeholder="e.g. Blockchain Developer"
              className="apple-glass rounded-xl theme-transition border-white/10 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>
        )}
        
        {/* Experience Level */}
        <div className="mb-6">
          <Label htmlFor="experience-level" className="mb-2 block">
            Experience Level
          </Label>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger 
              id="experience-level" 
              className="apple-glass rounded-xl theme-transition border-white/10 focus:ring-primary/50 focus:border-primary/50"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-white/10 bg-black/90 backdrop-blur-xl">
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
          className="w-full rounded-xl theme-transition bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          <Search className="mr-2 h-4 w-4" /> 
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>
    </div>
  );
};

export default JobSelector;
