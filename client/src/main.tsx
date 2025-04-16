import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set up better error logging for development
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error caught:', { message, source, lineno, colno, error });
    return false;
  };
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error("Error rendering the application:", error);
    
    // Display a fallback UI
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; padding: 20px; text-align: center;">
        <h1 style="color: #e11d48; margin-bottom: 16px; font-size: 24px; font-weight: bold;">Application Failed to Load</h1>
        <p style="max-width: 500px; margin-bottom: 16px;">There was a problem loading the application. Please try refreshing the page.</p>
        <button 
          style="background-color: #2563eb; color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer; border: none;"
          onclick="window.location.reload()"
        >
          Refresh Page
        </button>
      </div>
    `;
  }
}
