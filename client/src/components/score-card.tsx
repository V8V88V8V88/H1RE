import { Card, CardContent } from "@/components/ui/card";
import { badge } from "@shared/schema";
import { calculateCircumference } from "@/lib/utils";

interface ScoreCardProps {
  overallScore: number;
  grammarScore: number;
  atsScore: number;
  keywordScore: number;
  formatScore: number;
  earnedBadges: typeof badge._type[];
}

const ScoreCard = ({ 
  overallScore, 
  grammarScore, 
  atsScore, 
  keywordScore, 
  formatScore,
  earnedBadges 
}: ScoreCardProps) => {
  const getResumeLevel = () => {
    if (overallScore < 50) return "Beginner";
    if (overallScore < 70) return "Intermediate";
    if (overallScore < 90) return "Pro";
    return "Expert";
  };

  const getLevelBadgeClass = () => {
    if (overallScore < 50) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    if (overallScore < 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    if (overallScore < 90) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  };

  const circumference = 251.2; // 2 * π * r (where r=40)
  const offset = circumference - (circumference * overallScore) / 100;
  
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Resume Score</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Based on a comprehensive analysis</p>
            
            {/* Level Badge */}
            <div className="mt-3">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${getLevelBadgeClass()}`}>
                {getResumeLevel()}
              </span>
            </div>
          </div>
          
          {/* Circular Progress */}
          <div className="flex h-24 w-24 items-center justify-center">
            <svg className="w-full" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}>
              <circle 
                className="text-gray-200 dark:text-gray-700" 
                strokeWidth="10" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" />
              <circle 
                className="text-primary" 
                strokeWidth="10" 
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" />
              <g transform="rotate(90 50 50)">
                <text 
                  x="50" 
                  y="45" 
                  fontSize="20" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  className="fill-gray-700 dark:fill-gray-300 font-medium">
                  {overallScore}
                </text>
                <text 
                  x="50" 
                  y="65" 
                  fontSize="12" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  className="fill-gray-500 dark:fill-gray-400">
                  / 100
                </text>
              </g>
            </svg>
          </div>
        </div>
        
        {/* Category Scores */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Grammar</p>
              <span className="text-sm font-bold">{grammarScore}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-full rounded-full bg-green-500" 
                style={{ width: `${grammarScore}%` }}></div>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">ATS</p>
              <span className="text-sm font-bold">{atsScore}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-full rounded-full bg-purple-500" 
                style={{ width: `${atsScore}%` }}></div>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Keyword</p>
              <span className="text-sm font-bold">{keywordScore}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-full rounded-full bg-primary" 
                style={{ width: `${keywordScore}%` }}></div>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Format</p>
              <span className="text-sm font-bold">{formatScore}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-full rounded-full bg-yellow-500" 
                style={{ width: `${formatScore}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map((badge) => (
                <span key={badge.id} className="flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1 text-xs font-medium">
                  <i className={`${badge.icon} mr-1 text-primary`}></i>
                  <span>{badge.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
