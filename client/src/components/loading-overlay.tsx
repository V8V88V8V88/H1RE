const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity">
      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-2xl border border-gray-200 dark:border-zinc-800 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <div className="h-20 w-20 rounded-full border-4 border-gray-200 dark:border-zinc-800"></div>
            <div className="h-20 w-20 rounded-full border-4 border-t-[#0078d4] border-r-[#0078d4] border-b-transparent border-l-transparent animate-spin absolute top-0 left-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-[#0078d4]/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-[#0078d4] animate-pulse"></div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Analyzing Resume...</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 text-center">We are analyzing your resume. Please wait.</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
