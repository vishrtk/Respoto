'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const sidebarVariants = cva(
  'h-screen transition-all duration-300 ease-in-out overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-white border-r border-gray-200',
        dark: 'bg-gray-900 text-white',
        light: 'bg-gray-50 border-r border-gray-200',
        instagram: 'bg-gradient-to-b from-purple-50 to-pink-50 border-r border-gray-200',
      },
      expanded: {
        true: 'w-64',
        false: 'w-20',
      },
      mobile: {
        true: 'fixed top-0 left-0 z-40',
        false: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      expanded: true,
      mobile: false,
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  logo?: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  mobileBreakpoint?: number;
  onExpandChange?: (expanded: boolean) => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    className, 
    variant, 
    expanded: controlledExpanded, 
    mobile,
    logo,
    collapsible = true,
    defaultExpanded = true,
    mobileBreakpoint = 768,
    onExpandChange,
    children, 
    ...props 
  }, ref) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : expanded;
    const isMobile = mobile !== undefined ? mobile : typeof window !== 'undefined' && window.innerWidth < mobileBreakpoint;
    
    const handleToggle = () => {
      const newExpanded = !isExpanded;
      setExpanded(newExpanded);
      if (onExpandChange) onExpandChange(newExpanded);
    };

    const handleMobileToggle = () => {
      setIsMobileOpen(!isMobileOpen);
    };

    return (
      <>
        {isMobile && (
          <button
            className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
            onClick={handleMobileToggle}
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        <div
          className={sidebarVariants({ 
            variant, 
            expanded: isMobile ? isMobileOpen : isExpanded, 
            mobile: isMobile,
            className 
          })}
          ref={ref}
          {...props}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-auto' : 'w-0'}`}>
                {logo}
              </div>
              
              {collapsible && !isMobile && (
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={handleToggle}
                  aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                  <svg 
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              {children}
            </div>
          </div>
        </div>
        
        {isMobile && isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={handleMobileToggle}
            aria-hidden="true"
          />
        )}
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  active?: boolean;
  href: string;
  expanded?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  className, 
  icon, 
  active, 
  href, 
  expanded = true,
  children, 
  ...props 
}) => {
  return (
    <Link
      href={href}
      className={`
        flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors
        ${active ? 'bg-purple-50 text-purple-700 font-medium' : ''}
        ${className || ''}
      `}
      {...props}
    >
      {icon && <div className="mr-3">{icon}</div>}
      {expanded && <div className="truncate">{children}</div>}
    </Link>
  );
};

export default Sidebar;
