import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateCircumference(score: number): number {
  const circle = 251.2; // 2 * π * r (where r=40)
  const offset = circle - (circle * score) / 100;
  return offset;
}

// Function to extract text from PDF/DOCX file
export function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        if (!event.target || !event.target.result) {
          throw new Error("Failed to read file");
        }
        
        // Handle different file types
        if (file.type === 'application/pdf') {
          // For PDF files
          // In a real application, this would use a PDF parsing library
          resolve("PDF content would be extracted here in a production environment");
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          // For DOCX files
          // In a real application, this would use a DOCX parsing library
          resolve("DOCX content would be extracted here in a production environment");
        } else {
          throw new Error("Unsupported file type");
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsArrayBuffer(file);
  });
}

// Function to format job role for display
export function formatJobRole(role: string): string {
  return role.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}
