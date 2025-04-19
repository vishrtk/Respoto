'use client';

import { useEffect } from 'react';
import AnimatedElement from '/src/components/ui/AnimatedElement';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="loading-spinner"></div>
      <span className="ml-2 loading-dots">Loading</span>
    </div>
  );
}

export function LoadingButton({ children, isLoading, ...props }: any) {
  return (
    <button
      className="btn btn-primary relative"
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-primary rounded-md">
          <div className="loading-spinner w-5 h-5 border-2"></div>
        </span>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  );
}

export function ShimmerEffect({ className = '', width = 'w-full', height = 'h-8' }) {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 animate-shimmer"></div>
    </div>
  );
}

export function PulseEffect({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring"></div>
      {children}
    </div>
  );
}

export function FloatingElement({ children, className = '' }) {
  return (
    <div className={`animate-float ${className}`}>
      {children}
    </div>
  );
}

export function PageTransition({ children }) {
  useEffect(() => {
    // Add page transition class to body when component mounts
    document.body.classList.add('page-enter');
    document.body.classList.add('page-enter-active');
    
    // Remove classes after animation completes
    const timeout = setTimeout(() => {
      document.body.classList.remove('page-enter');
      document.body.classList.remove('page-enter-active');
    }, 300);
    
    return () => {
      clearTimeout(timeout);
      // Add exit animation classes when component unmounts
      document.body.classList.add('page-exit');
      document.body.classList.add('page-exit-active');
    };
  }, []);
  
  return <>{children}</>;
}
