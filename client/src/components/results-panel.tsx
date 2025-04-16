import { ResumeAnalysisResponse } from "@shared/schema";
import ScoreCard from "@/components/score-card";
import AnalysisCard from "@/components/analysis-card";
import { cn } from "@/lib/utils";
import { generatePDFReport } from '../lib/pdf-generator';
import { useState } from 'react';
import { Briefcase, BarChart } from 'lucide-react';

interface ResultsPanelProps {
  result: ResumeAnalysisResponse;
}

const ResultsPanel = ({ result }: ResultsPanelProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const {
    overallScore,
    grammarScore,
    atsScore,
    keywordScore,
    formatScore,
    earnedBadges,
    grammarFeedback,
    atsFeedback,
    keywordFeedback,
    recommendations,
    jobRole,
    customJobRole,
    experienceLevel
  } = result;

  // Helper function to get appropriate color class based on score
  const getScoreColorClass = (score: number) => {
    if (score < 50) return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
    if (score < 70) return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30";
    if (score < 90) return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
    return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
  };

  // Format job role for display
  const formatJobRole = (role: string | undefined | null): string => {
    if (!role) return "Not specified";
    
    if (role === "custom" && customJobRole) {
      return customJobRole;
    }
    return role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Format experience level for display
  const formatExperienceLevel = (level: string | undefined | null): string => {
    if (!level) return "Not specified";
    
    switch (level) {
      case "entry": return "Entry Level (0-2 years)";
      case "mid": return "Mid Level (3-5 years)";
      case "senior": return "Senior Level (6+ years)";
      case "executive": return "Executive Level";
      default: return level.charAt(0).toUpperCase() + level.slice(1);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Target Position Information */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Analysis Results</h2>
        </div>
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center flex-1">
            <Briefcase className="h-5 w-5 text-primary" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Target Position</p>
              <p className="text-base font-semibold">{formatJobRole(jobRole)}</p>
            </div>
          </div>
          <div className="flex items-center flex-1">
            <BarChart className="h-5 w-5 text-primary" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience Level</p>
              <p className="text-base font-semibold">{formatExperienceLevel(experienceLevel)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overall Score Card */}
      <ScoreCard 
        overallScore={overallScore}
        grammarScore={grammarScore}
        atsScore={atsScore}
        keywordScore={keywordScore}
        formatScore={formatScore}
        earnedBadges={earnedBadges}
      />

      {/* Detailed Analysis Cards */}
      <div className="space-y-6">
        {/* Grammar & Readability */}
        <AnalysisCard 
          title="Grammar & Readability"
          score={grammarScore}
          scoreColorClass={getScoreColorClass(grammarScore)}
        >
          <ul className="space-y-3">
            {grammarFeedback.issues.map((issue, index) => (
              <li key={index} className="flex items-start">
                {issue.type === "positive" && (
                  <svg className="h-5 w-5 mt-0.5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                )}
                {issue.type === "warning" && (
                  <svg className="h-5 w-5 mt-0.5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                )}
                {issue.type === "error" && (
                  <svg className="h-5 w-5 mt-0.5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                )}
                <span className="ml-2">{issue.text}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 rounded-md bg-gray-50 dark:bg-gray-800 p-3">
            <h3 className="mb-2 text-sm font-medium">Readability Score</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{grammarFeedback.readabilityComment}</p>
          </div>
        </AnalysisCard>
        
        {/* ATS Optimization */}
        <AnalysisCard 
          title="ATS Optimization"
          score={atsScore}
          scoreColorClass={getScoreColorClass(atsScore)}
        >
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Section Detection</h3>
            <div className="space-y-2">
              {atsFeedback.sections.map((section, index) => (
                <div key={index} className="flex items-center justify-between rounded-md bg-gray-50 dark:bg-gray-800 px-3 py-2">
                  <div className="flex items-center">
                    {section.found ? (
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    )}
                    <span className="ml-2 text-sm">{section.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{section.found ? "Found" : "Missing"}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 rounded-md bg-gray-50 dark:bg-gray-800 p-3">
            <h3 className="mb-2 text-sm font-medium">ATS Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {atsFeedback.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-4 w-4 mt-0.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  <span className="ml-1">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnalysisCard>
        
        {/* Keyword Matching */}
        <AnalysisCard 
          title="Keyword Matching" 
          score={keywordScore}
          scoreColorClass={getScoreColorClass(keywordScore)}
          scoreLabel="Match"
        >
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Found Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {keywordFeedback.foundKeywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-800 dark:text-green-300"
                >
                  {keyword}
                </span>
              ))}
              {keywordFeedback.foundKeywords.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">No relevant keywords found.</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {keywordFeedback.missingKeywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-xs font-medium text-red-800 dark:text-red-300"
                >
                  {keyword}
                </span>
              ))}
              {keywordFeedback.missingKeywords.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">Great job! You've included all key keywords.</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 rounded-md bg-gray-50 dark:bg-gray-800 p-3">
            <h3 className="mb-2 text-sm font-medium">Keyword Recommendations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{keywordFeedback.recommendation}</p>
          </div>
        </AnalysisCard>
        
        {/* Final Recommendations */}
        <AnalysisCard title="Final Recommendations">
          <div className="space-y-4">
            {/* Strengths */}
            {recommendations.filter(r => r.type === "strength").length > 0 && (
              <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Overall Strengths</h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                      {recommendations.filter(r => r.type === "strength").map((rec, index) => (
                        <p key={index} className="mt-1">{rec.text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Areas for Improvement */}
            {recommendations.filter(r => r.type === "improvement").length > 0 && (
              <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Areas for Improvement</h3>
                    <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                      {recommendations.filter(r => r.type === "improvement").map((rec, index) => (
                        <li key={index}>{rec.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Next Steps */}
            {recommendations.filter(r => r.type === "next-step").length > 0 && (
              <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Next Steps</h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                      {recommendations.filter(r => r.type === "next-step").map((rec, index) => (
                        <p key={index} className="mt-1">{rec.text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                setIsGeneratingPDF(true);
                try {
                  generatePDFReport(result);
                } finally {
                  setIsGeneratingPDF(false);
                }
              }}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Detailed Report
                </>
              )}
            </button>
          </div>
        </AnalysisCard>
      </div>
    </div>
  );
};

export default ResultsPanel;
