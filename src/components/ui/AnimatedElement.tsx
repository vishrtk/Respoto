'use client';

import { useEffect, useState } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-in' | 'slide-in-left' | 'slide-in-right' | 'zoom-in' | 'bounce';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedElement({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 300,
  className = '',
  threshold = 0.1,
  once = true
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Skip if already animated and once is true
    if (once && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px'
      }
    );

    const currentElement = document.getElementById(`animated-element-${Math.random().toString(36).substr(2, 9)}`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once, hasAnimated]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-in':
        return 'animate-slide-in';
      case 'slide-in-left':
        return 'animate-slide-in-left';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      case 'zoom-in':
        return 'animate-zoom-in';
      case 'bounce':
        return 'animate-bounce';
      default:
        return 'animate-fade-in';
    }
  };

  const id = `animated-element-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      id={id}
      className={`${className} ${getAnimationClass()}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}
