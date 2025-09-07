"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 shadow-sm"
        title="Toggle theme"
      >
        <SunIcon className="h-5 w-5 text-gray-400" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm overflow-hidden"
      title="Toggle theme"
    >
      <div className="relative z-10 w-5 h-5">
        <SunIcon 
          className="absolute inset-0 h-5 w-5 text-yellow-500 transform transition-transform duration-500 ease-in-out rotate-0 scale-100 dark:-rotate-90 dark:scale-0" 
        />
        <MoonIcon 
          className="absolute inset-0 h-5 w-5 text-blue-500 transform transition-transform duration-500 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100" 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
      
      {/* Animated background effect */}
      <span className="absolute inset-0 transform transition-transform duration-700 ease-in-out scale-0 dark:scale-100 dark:bg-gray-800 rounded-full"></span>
    </button>
  );
}
