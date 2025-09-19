
import React from 'react';
import { TaskMode } from '../types';

interface TabsProps {
  activeTab: TaskMode;
  onTabChange: (tab: TaskMode) => void;
}

const TABS: { id: TaskMode; label: string }[] = [
  { id: TaskMode.GENERATE, label: 'Generate' },
  { id: TaskMode.EXPLAIN, label: 'Explain' },
  { id: TaskMode.REFACTOR, label: 'Refactor' },
];

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 bg-gray-700 p-1 rounded-md">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`w-full px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ease-in-out
            ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-white shadow'
                : 'text-gray-300 hover:bg-gray-600'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
