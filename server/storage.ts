import { users, resumeAnalyses, type User, type InsertUser, type ResumeAnalysis, type InsertResumeAnalysis } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume analysis methods
  createResumeAnalysis(analysis: InsertResumeAnalysis): Promise<ResumeAnalysis>;
  getResumeAnalysis(id: number): Promise<ResumeAnalysis | undefined>;
  getResumeAnalyses(): Promise<ResumeAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumeAnalyses: Map<number, ResumeAnalysis>;
  private userCurrentId: number;
  private analysisCurrentId: number;

  constructor() {
    this.users = new Map();
    this.resumeAnalyses = new Map();
    this.userCurrentId = 1;
    this.analysisCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createResumeAnalysis(insertAnalysis: InsertResumeAnalysis): Promise<ResumeAnalysis> {
    const id = this.analysisCurrentId++;
    const analysis: ResumeAnalysis = { ...insertAnalysis, id };
    this.resumeAnalyses.set(id, analysis);
    return analysis;
  }
  
  async getResumeAnalysis(id: number): Promise<ResumeAnalysis | undefined> {
    return this.resumeAnalyses.get(id);
  }
  
  async getResumeAnalyses(): Promise<ResumeAnalysis[]> {
    return Array.from(this.resumeAnalyses.values());
  }
}

export const storage = new MemStorage();
