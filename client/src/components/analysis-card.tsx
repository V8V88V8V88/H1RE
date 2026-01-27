import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AnalysisCardProps {
  title: string;
  children: ReactNode;
  score?: number;
  scoreColorClass?: string;
  scoreLabel?: string;
}

const AnalysisCard = ({ 
  title, 
  children, 
  score,
  scoreColorClass = "bg-blue-100 text-blue-800 dark:bg-zinc-900 dark:text-white",
  scoreLabel = "Score"
}: AnalysisCardProps) => {
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          {score !== undefined && (
            <span 
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${scoreColorClass}`}
            >
              {score}% {scoreLabel}
            </span>
          )}
        </div>
        
        {children}
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
