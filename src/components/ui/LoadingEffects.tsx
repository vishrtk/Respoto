'use client';

import React, { useState, useEffect } from 'react';

interface LoadingEffectsProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingEffects: React.FC<LoadingEffectsProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'text-purple-600',
  text,
  fullScreen = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
    : 'flex items-center justify-center';

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <svg
            className={`animate-spin ${sizeClasses[size]} ${color}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        );
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div className={`${color} ${sizeClasses[size]} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`${color} ${sizeClasses[size]} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`${color} ${sizeClasses[size]} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        );
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} ${color} rounded-full animate-pulse`}></div>
        );
      case 'skeleton':
        return (
          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        {renderLoader()}
        {text && <p className={`mt-2 ${color} text-sm font-medium`}>{text}</p>}
      </div>
    </div>
  );
};

export default LoadingEffects;
