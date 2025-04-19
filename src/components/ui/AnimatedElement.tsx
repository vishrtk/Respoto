'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const animatedElementVariants = cva(
  'transition-all duration-500',
  {
    variants: {
      animation: {
        fadeIn: 'opacity-0',
        fadeInUp: 'opacity-0 translate-y-10',
        fadeInDown: 'opacity-0 -translate-y-10',
        fadeInLeft: 'opacity-0 translate-x-10',
        fadeInRight: 'opacity-0 -translate-x-10',
        zoomIn: 'opacity-0 scale-95',
        zoomOut: 'opacity-0 scale-105',
        bounce: 'opacity-0',
        pulse: 'opacity-0',
        slideUp: 'opacity-0 translate-y-20',
        slideDown: 'opacity-0 -translate-y-20',
      },
      delay: {
        none: '',
        100: 'delay-100',
        200: 'delay-200',
        300: 'delay-300',
        400: 'delay-400',
        500: 'delay-500',
        700: 'delay-700',
        1000: 'delay-1000',
      },
      threshold: {
        0: '',
        25: '',
        50: '',
        75: '',
        100: '',
      },
    },
    defaultVariants: {
      animation: 'fadeIn',
      delay: 'none',
      threshold: 0,
    },
  }
);

export interface AnimatedElementProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animatedElementVariants> {
  once?: boolean;
  disabled?: boolean;
  rootMargin?: string;
}

const AnimatedElement = React.forwardRef<HTMLDivElement, AnimatedElementProps>(
  ({ 
    className, 
    animation, 
    delay,
    threshold = 0,
    once = true,
    disabled = false,
    rootMargin = '0px',
    children, 
    ...props 
  }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(disabled);
    const combinedRef = useCombinedRefs(ref, elementRef);
    
    useEffect(() => {
      if (disabled) {
        setIsVisible(true);
        return;
      }
      
      const currentElement = elementRef.current;
      if (!currentElement) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(currentElement);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        {
          threshold: Number(threshold) / 100,
          rootMargin,
        }
      );
      
      observer.observe(currentElement);
      
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }, [disabled, once, rootMargin, threshold]);
    
    const animationClass = animation ? animatedElementVariants({ animation, delay }) : '';
    const visibleClass = isVisible ? getVisibleClass(animation) : '';
    
    return (
      <div
        ref={combinedRef}
        className={`${animationClass} ${visibleClass} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedElement.displayName = 'AnimatedElement';

// Helper function to get the visible class based on the animation type
function getVisibleClass(animation?: string): string {
  switch (animation) {
    case 'fadeIn':
      return 'opacity-100';
    case 'fadeInUp':
    case 'fadeInDown':
      return 'opacity-100 translate-y-0';
    case 'fadeInLeft':
    case 'fadeInRight':
      return 'opacity-100 translate-x-0';
    case 'zoomIn':
    case 'zoomOut':
      return 'opacity-100 scale-100';
    case 'bounce':
      return 'opacity-100 animate-bounce';
    case 'pulse':
      return 'opacity-100 animate-pulse';
    case 'slideUp':
    case 'slideDown':
      return 'opacity-100 translate-y-0';
    default:
      return 'opacity-100';
  }
}

// Helper function to combine refs
function useCombinedRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (element: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as React.MutableRefObject<T>).current = element;
      }
    });
  };
}

export default AnimatedElement;
