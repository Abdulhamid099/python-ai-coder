
import React, { useEffect, useRef } from 'react';
import { Loader } from './icons/Loader';

interface CodeDisplayProps {
  output: string;
  isLoading: boolean;
  error: string | null;
}

// Ensure Prism is available on the window object for TypeScript
declare global {
  interface Window {
    Prism: any;
  }
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ output, isLoading, error }) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (output && codeRef.current && window.Prism) {
      window.Prism.highlightElement(codeRef.current);
    }
  }, [output]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Loader className="w-12 h-12 text-cyan-500" />
          <p className="mt-4 text-lg">Generating response...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-400 p-4">
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 text-center">
                 <h3 className="text-xl font-semibold mb-2">An Error Occurred</h3>
                 <p>{error}</p>
            </div>
        </div>
      );
    }
    
    if (output) {
       return (
        <pre className="h-full w-full overflow-auto"><code ref={codeRef} className="language-python">{output}</code></pre>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1V2M4 7l2 1M4 7l2-1M4 7v2.5M12 21.5v-2.5M12 11.5v-2.5M12 2.5v2.5M12 11.5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
            </svg>
            <h3 className="text-xl font-semibold">AI Output Panel</h3>
            <p className="mt-2 text-center">Your generated code, explanations, or refactoring results will appear here.</p>
        </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex-grow p-4 overflow-hidden h-full">
        {renderContent()}
    </div>
  );
};
