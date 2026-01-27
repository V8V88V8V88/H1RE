import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface ResumeInputProps {
  id?: string;
  resumeText: string;
  setResumeText: (text: string) => void;
  compact?: boolean;
}

const ResumeInput = ({ id, resumeText, setResumeText, compact = false }: ResumeInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [showPasteSection, setShowPasteSection] = useState(false);
  const { toast } = useToast();

  const uploadResumeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(`${API_BASE_URL}/api/upload-resume`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }

      return response.json() as Promise<{ text: string }>;
    },
    onSuccess: (data) => {
      setResumeText(data.text);
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully parsed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload and parse resume file",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadResumeMutation.mutate(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      uploadResumeMutation.mutate(file);
    }
  };

  const getCharacterCount = () => {
    return `${resumeText.length} characters`;
  };

  const clearText = () => {
    setResumeText("");
  };

  return (
    <div id={id} className="apple-card shadow-xl theme-transition overflow-hidden">
      <div className="relative">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0078d4] via-[#00a4ef] to-[#0078d4]"></div>
        
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Input</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upload your resume file or paste the content directly</p>
          </div>
          
          {/* File Upload */}
          <div className="mb-8">
            <Label htmlFor="resume-upload" className="mb-3 block text-base font-medium text-gray-900 dark:text-white">
              Upload Resume Document
            </Label>
            <div 
              className={`group relative flex justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
                dragActive 
                  ? 'border-[#0078d4] bg-[#0078d4]/10 dark:bg-[#0078d4]/20 scale-[1.02]' 
                  : 'border-gray-300 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 hover:border-[#0078d4]/50 hover:bg-[#0078d4]/5 dark:hover:bg-[#0078d4]/10'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="p-10 space-y-4 text-center">
                <div className="space-y-2">
                  <div className="flex flex-row justify-center items-center gap-3">
                    <Label htmlFor="resume-upload" className="relative cursor-pointer rounded-lg px-6 py-3 bg-[#0078d4] hover:bg-[#0066b3] text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                      <span className="flex items-center gap-2">
                        <UploadCloud className="h-4 w-4" />
                        Upload a file
                      </span>
                      <input 
                        id="resume-upload" 
                        name="resume-upload" 
                        type="file" 
                        accept=".pdf,.docx" 
                        className="sr-only" 
                        onChange={handleFileUpload}
                        disabled={uploadResumeMutation.isPending}
                      />
                    </Label>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {uploadResumeMutation.isPending 
                      ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </span>
                      )
                      : "PDF or DOCX up to 10MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Paste Text Toggle Button */}
          {!showPasteSection && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowPasteSection(true)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#0078d4] dark:hover:text-[#0078d4] transition-colors"
              >
                <span>Or paste resume text instead</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {/* Text Area Input - Collapsible */}
          {showPasteSection && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="resume-text" className="text-base font-medium text-gray-900 dark:text-white">
                  Paste Resume Text
                </Label>
                <button
                  onClick={() => {
                    setShowPasteSection(false);
                    if (resumeText.length === 0) {
                      setResumeText("");
                    }
                  }}
                  className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <ChevronUp className="h-4 w-4" />
                  <span>Hide</span>
                </button>
              </div>
              <div className="relative">
                <Textarea 
                  id="resume-text" 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className={`w-full border-2 border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:border-[#0078d4] focus:ring-4 focus:ring-[#0078d4]/10 resize-none rounded-xl transition-all shadow-sm focus:shadow-md ${compact ? 'min-h-[200px] max-h-[300px]' : 'min-h-[400px]'}`}
                  placeholder="Paste your resume content here..."
                />
                {resumeText.length > 0 && (
                  <div className="absolute top-3 right-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearText}
                      className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
                      title="Clear text"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${resumeText.length > 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{getCharacterCount()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeInput;
