import React from 'react';
import { Home, BookOpen, Video, Brain, Target, Bookmark, Search, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'search', label: 'Research', icon: Search },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'documents', label: 'Documents', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'paths', label: 'Learning Paths', icon: Target },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'notes', label: 'AI Notes', icon: FileText },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">StudyOne</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeView === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800 scale-105'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </button>
              );
            })}
            <div className="border-l border-gray-200 dark:border-gray-700 h-8 mx-4"></div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;