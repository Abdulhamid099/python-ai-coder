
import React from 'react';
import { PythonIcon } from './icons/PythonIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 flex items-center border-b border-gray-700">
        <PythonIcon className="w-8 h-8 mr-3 text-cyan-400" />
        <h1 className="text-2xl font-bold text-white tracking-wider">
            Python AI Coder
        </h1>
    </header>
  );
};
