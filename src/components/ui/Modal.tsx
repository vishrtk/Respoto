'use client';

import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const modalVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 transition-opacity',
  {
    variants: {
      variant: {
        default: '',
        centered: 'items-center',
        top: 'items-start pt-10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const contentVariants = cva(
  'bg-white rounded-lg shadow-xl transform transition-all w-full mx-4 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        full: 'max-w-full',
      },
      animation: {
        none: '',
        fade: 'animate-fade-in',
        zoom: 'animate-zoom-in',
        slideUp: 'animate-slide-up',
        slideDown: 'animate-slide-down',
      },
    },
    defaultVariants: {
      size: 'md',
      animation: 'zoom',
    },
  }
);

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  size?: VariantProps<typeof contentVariants>['size'];
  animation?: VariantProps<typeof contentVariants>['animation'];
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  title?: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    className, 
    variant, 
    isOpen, 
    onClose, 
    size, 
    animation,
    closeOnOutsideClick = true, 
    closeOnEsc = true, 
    showCloseButton = true,
    title,
    children, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
      setIsVisible(isOpen);
      
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (closeOnEsc && e.key === 'Escape') {
          onClose();
        }
      };
      
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [closeOnEsc, onClose]);

    if (!isVisible) return null;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOutsideClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className={modalVariants({ variant, className })}
        ref={ref}
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className={contentVariants({ size, animation })}>
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {showCloseButton && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
