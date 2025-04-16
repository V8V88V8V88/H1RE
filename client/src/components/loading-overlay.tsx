const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="rounded-lg bg-white dark:bg-gray-800 p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="mt-4 text-lg font-medium">Analyzing Resume...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This may take a few moments</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
