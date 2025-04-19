'use client';

import React from 'react';
import { useMediaQuery } from 'react-responsive';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: '(max-width: 639px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const matches = useMediaQuery({ query: breakpoints[breakpoint] });
  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery({ query: '(max-width: 767px)' });
}

export function useIsTablet(): boolean {
  return useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
}

export function useIsDesktop(): boolean {
  return useMediaQuery({ query: '(min-width: 1024px)' });
}

export function useIsLargeDesktop(): boolean {
  return useMediaQuery({ query: '(min-width: 1280px)' });
}

export default useBreakpoint;
