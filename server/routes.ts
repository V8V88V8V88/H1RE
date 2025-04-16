import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resumeAnalysisRequestSchema } from "@shared/schema";
// Import Gemini API implementation instead of OpenAI
import { analyzeResume } from "./gemini";
import multer from "multer";
import * as mammoth from "mammoth";
// Import pdf-parse using dynamic import to avoid debug mode issues
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse');

// Define Request type with file property from multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Set up file upload with multer (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept only PDF and DOCX files
    if (file.mimetype === "application/pdf" || 
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to analyze resume
  app.post('/api/analyze-resume', async (req, res) => {
    try {
      const validatedData = resumeAnalysisRequestSchema.parse(req.body);
      const analysisResult = await analyzeResume(validatedData);
      
      // Store the analysis result
      const timestamp = new Date().toISOString();
      await storage.createResumeAnalysis({
        ...validatedData,
        overallScore: analysisResult.overallScore,
        grammarScore: analysisResult.grammarScore,
        atsScore: analysisResult.atsScore,
        keywordScore: analysisResult.keywordScore,
        formatScore: analysisResult.formatScore,
        earnedBadges: analysisResult.earnedBadges,
        grammarFeedback: analysisResult.grammarFeedback,
        atsFeedback: analysisResult.atsFeedback,
        keywordFeedback: analysisResult.keywordFeedback,
        recommendations: analysisResult.recommendations,
        createdAt: timestamp,
      });
      
      res.json(analysisResult);
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      res.status(400).json({ 
        message: error.message || "Invalid request data" 
      });
    }
  });

  // API route to upload and parse resume files
  app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      let text = '';
      
      // Parse the file based on its mimetype
      if (req.file.mimetype === "application/pdf") {
        // Parse PDF
        const pdfData = await pdfParse(req.file.buffer);
        text = pdfData.text;
      } else {
        // Parse DOCX
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer
        });
        text = result.value;
      }

      // Return the extracted text
      res.json({ text });
    } catch (error: any) {
      console.error("Error parsing resume file:", error);
      res.status(400).json({ 
        message: error.message || "Failed to parse resume file" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
