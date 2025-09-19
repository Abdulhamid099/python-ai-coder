
import React from 'react';
import { TaskMode } from '../types';

interface CodeEditorProps {
  userInput: string;
  onUserInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  taskMode: TaskMode;
}

const PLACEHOLDERS: Record<TaskMode, string> = {
  [TaskMode.GENERATE]: "e.g., a function to find all prime numbers up to n",
  [TaskMode.EXPLAIN]: "Paste Python code here to get an explanation...",
  [TaskMode.REFACTOR]: "Paste Python code here to get a refactored version...",
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ userInput, onUserInput, onSubmit, isLoading, taskMode }) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-800 rounded-lg shadow-lg p-4">
      <textarea
        value={userInput}
        onChange={(e) => onUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={PLACEHOLDERS[taskMode]}
        className="w-full flex-grow bg-gray-900 text-gray-200 p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none font-mono text-sm resize-none"
        aria-label="Code Input"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="mt-4 w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : 'Submit (Ctrl+Enter)'}
      </button>
    </div>
  );
};
