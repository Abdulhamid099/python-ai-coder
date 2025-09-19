
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { CodeEditor } from './components/CodeEditor';
import { CodeDisplay } from './components/CodeDisplay';
import { runPythonTask } from './services/geminiService';
import { TaskMode } from './types';

function App() {
  const [taskMode, setTaskMode] = useState<TaskMode>(TaskMode.GENERATE);
  const [userInput, setUserInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim()) {
      setError("Input cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const result = await runPythonTask(taskMode, userInput);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, taskMode]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row gap-6 p-6">
        {/* Left Panel: Controls */}
        <div className="flex flex-col md:w-1/2 lg:w-2/5 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-3 text-cyan-400">Choose your task</h2>
            <Tabs activeTab={taskMode} onTabChange={setTaskMode} />
          </div>
          <CodeEditor
            userInput={userInput}
            onUserInput={setUserInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            taskMode={taskMode}
          />
        </div>

        {/* Right Panel: Output */}
        <div className="flex-grow flex flex-col md:w-1/2 lg:w-3/5">
           <CodeDisplay output={output} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
}

export default App;
