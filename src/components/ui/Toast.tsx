'use client';

import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const toastVariants = cva(
  'fixed flex items-center p-4 mb-4 rounded-lg shadow-lg transition-all duration-300 transform',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-800 border border-gray-200',
        success: 'bg-green-50 text-green-800 border border-green-200',
        error: 'bg-red-50 text-red-800 border border-red-200',
        warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        info: 'bg-blue-50 text-blue-800 border border-blue-200',
        instagram: 'bg-gradient-to-r from-purple-50 to-pink-50 text-pink-800 border border-pink-200',
      },
      position: {
        topRight: 'top-4 right-4',
        topLeft: 'top-4 left-4',
        bottomRight: 'bottom-4 right-4',
        bottomLeft: 'bottom-4 left-4',
        topCenter: 'top-4 left-1/2 -translate-x-1/2',
        bottomCenter: 'bottom-4 left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'topRight',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  show: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
  icon?: React.ReactNode;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant, 
    position, 
    show, 
    onClose, 
    autoClose = true, 
    autoCloseTime = 5000, 
    icon, 
    children, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
      setIsVisible(show);
    }, [show]);

    useEffect(() => {
      if (autoClose && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose();
        }, autoCloseTime);
        
        return () => clearTimeout(timer);
      }
    }, [autoClose, autoCloseTime, isVisible, onClose]);

    if (!isVisible) return null;

    return (
      <div
        className={toastVariants({ variant, position, className })}
        ref={ref}
        role="alert"
        {...props}
      >
        {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}
        <div className="flex-grow">{children}</div>
        {onClose && (
          <button
            type="button"
            className="ml-3 -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8 items-center justify-center"
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
