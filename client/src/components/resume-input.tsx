import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, Trash2 } from "lucide-react";

interface ResumeInputProps {
  id?: string;
  resumeText: string;
  setResumeText: (text: string) => void;
}

const ResumeInput = ({ id, resumeText, setResumeText }: ResumeInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadResumeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/upload-resume", {
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
    <Card id={id} className="shadow-md">
      <CardContent className="pt-6">
        <h2 className="mb-4 text-xl font-semibold">Resume Input</h2>
        
        {/* File Upload */}
        <div className="mb-6">
          <Label htmlFor="resume-upload" className="mb-2 block">
            Upload Resume Document
          </Label>
          <div 
            className={`mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 pb-6 pt-5 ${dragActive ? 'bg-primary/5 border-primary/50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <Label htmlFor="resume-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800">
                  <span>Upload a file</span>
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
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {uploadResumeMutation.isPending 
                  ? "Uploading..." 
                  : "PDF or DOCX up to 10MB"}
              </p>
            </div>
          </div>
        </div>
        
        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">OR</span>
          </div>
        </div>
        
        {/* Text Area Input */}
        <div>
          <Label htmlFor="resume-text" className="mb-2 block">
            Paste Resume Text
          </Label>
          <Textarea 
            id="resume-text" 
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[400px] w-full" 
            placeholder="Paste your resume content here..."
          />
          
          <div className="mt-4 flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">{getCharacterCount()}</span>
            <div className="flex-grow"></div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearText}
              className="h-8 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Trash2 className="mr-1 h-4 w-4" /> Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeInput;
