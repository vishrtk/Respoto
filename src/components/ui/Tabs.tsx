'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tabsContainerVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        pills: '',
        underlined: 'border-b border-gray-200',
        enclosed: 'rounded-lg border border-gray-200 p-1',
        instagram: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsListVariants = cva(
  'flex',
  {
    variants: {
      variant: {
        default: 'border-b border-gray-200',
        pills: 'space-x-2',
        underlined: '',
        enclosed: 'bg-transparent',
        instagram: 'border-b border-gray-200',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      fullWidth: false,
    },
  }
);

const tabItemVariants = cva(
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700',
        pills: 'rounded-md hover:bg-gray-100 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700',
        underlined: 'border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700',
        enclosed: 'rounded-md hover:bg-gray-100 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm',
        instagram: 'border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-pink-500 data-[state=active]:text-pink-700',
      },
      fullWidth: {
        true: 'flex-1 justify-center',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      fullWidth: false,
    },
  }
);

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContainerVariants> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  fullWidth?: boolean;
  tabs: {
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className, 
    variant, 
    defaultValue, 
    value: controlledValue,
    onValueChange,
    fullWidth = false,
    tabs,
    ...props 
  }, ref) => {
    const [selectedTab, setSelectedTab] = useState(defaultValue || (tabs.length > 0 ? tabs[0].value : ''));
    
    const currentValue = controlledValue !== undefined ? controlledValue : selectedTab;
    
    const handleTabChange = (value: string) => {
      if (controlledValue === undefined) {
        setSelectedTab(value);
      }
      if (onValueChange) {
        onValueChange(value);
      }
    };
    
    return (
      <div
        className={tabsContainerVariants({ variant, className })}
        ref={ref}
        {...props}
      >
        <div className={tabsListVariants({ variant, fullWidth })}>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={tabItemVariants({ 
                variant, 
                fullWidth,
                className: tab.disabled ? 'opacity-50 cursor-not-allowed' : '' 
              })}
              onClick={() => !tab.disabled && handleTabChange(tab.value)}
              data-state={currentValue === tab.value ? 'active' : 'inactive'}
              disabled={tab.disabled}
              type="button"
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-4">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className={currentValue === tab.value ? 'block' : 'hidden'}
              role="tabpanel"
              aria-labelledby={`tab-${tab.value}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;
