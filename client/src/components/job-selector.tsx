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
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <h2 className="mb-4 text-xl font-semibold">Job Role Selection</h2>
        
        <div className="mb-4">
          <Label htmlFor="job-role" className="mb-2 block">
            Target Position
          </Label>
          <Select value={selectedJobRole} onValueChange={handleRoleChange}>
            <SelectTrigger id="job-role">
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent>
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
            />
          </div>
        )}
        
        {/* Experience Level */}
        <div className="mb-6">
          <Label htmlFor="experience-level" className="mb-2 block">
            Experience Level
          </Label>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
            <SelectTrigger id="experience-level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
          className="w-full"
        >
          <Search className="mr-2 h-4 w-4" /> Analyze Resume
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobSelector;
