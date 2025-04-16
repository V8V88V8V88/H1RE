import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const resumeAnalyses = pgTable("resume_analyses", {
  id: serial("id").primaryKey(),
  resumeText: text("resume_text").notNull(),
  jobRole: text("job_role").notNull(),
  customJobRole: text("custom_job_role"),
  experienceLevel: text("experience_level").notNull(),
  overallScore: integer("overall_score").notNull(),
  grammarScore: integer("grammar_score").notNull(),
  atsScore: integer("ats_score").notNull(),
  keywordScore: integer("keyword_score").notNull(),
  formatScore: integer("format_score").notNull(),
  earnedBadges: jsonb("earned_badges").notNull(),
  grammarFeedback: jsonb("grammar_feedback").notNull(),
  atsFeedback: jsonb("ats_feedback").notNull(),
  keywordFeedback: jsonb("keyword_feedback").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertResumeAnalysisSchema = createInsertSchema(resumeAnalyses).omit({
  id: true,
});

// Schemas for API requests
export const resumeAnalysisRequestSchema = z.object({
  resumeText: z.string().min(1, "Resume text is required"),
  jobRole: z.string().min(1, "Job role is required"),
  customJobRole: z.string().optional(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
});

export const sectionStatus = z.object({
  name: z.string(),
  found: z.boolean(),
});

export const keyword = z.object({
  text: z.string(),
  found: z.boolean(),
});

export const badge = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
});

export const recommendation = z.object({
  text: z.string(),
  type: z.enum(["strength", "improvement", "next-step"]),
});

export const grammarIssue = z.object({
  type: z.enum(["positive", "warning", "error"]),
  text: z.string(),
});

export const resumeAnalysisResponseSchema = z.object({
  overallScore: z.number(),
  grammarScore: z.number(),
  atsScore: z.number(),
  keywordScore: z.number(),
  formatScore: z.number(),
  level: z.string(),
  earnedBadges: z.array(badge),
  grammarFeedback: z.object({
    issues: z.array(grammarIssue),
    readabilityComment: z.string(),
  }),
  atsFeedback: z.object({
    sections: z.array(sectionStatus),
    recommendations: z.array(z.string()),
  }),
  keywordFeedback: z.object({
    foundKeywords: z.array(z.string()),
    missingKeywords: z.array(z.string()),
    recommendation: z.string(),
  }),
  recommendations: z.array(recommendation),
});

export type ResumeAnalysisRequest = z.infer<typeof resumeAnalysisRequestSchema>;
export type ResumeAnalysisResponse = z.infer<typeof resumeAnalysisResponseSchema>;
export type InsertResumeAnalysis = z.infer<typeof insertResumeAnalysisSchema>;
export type ResumeAnalysis = typeof resumeAnalyses.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
