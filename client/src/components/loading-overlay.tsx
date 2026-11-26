import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/70 dark:bg-black/60 backdrop-blur-sm">
      <Loader2 className="h-7 w-7 animate-spin text-[#0078d4]" />
      <p className="text-sm text-gray-600 dark:text-gray-400">Analyzing your resume…</p>
    </div>
  );
};

export default LoadingOverlay;
