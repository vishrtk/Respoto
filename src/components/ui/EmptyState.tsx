'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Button from '@/components/ui/Button';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center p-8',
  {
    variants: {
      variant: {
        default: 'text-gray-500',
        subtle: 'text-gray-400',
        instagram: 'text-pink-500',
      },
      size: {
        sm: 'py-6',
        md: 'py-12',
        lg: 'py-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ 
    className, 
    variant, 
    size, 
    icon, 
    title, 
    description, 
    action,
    ...props 
  }, ref) => {
    return (
      <div
        className={emptyStateVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-gray-400">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-sm mb-6 max-w-md">{description}</p>
        )}
        {action && (
          <Button 
            variant={variant === 'instagram' ? 'instagram' : 'default'} 
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
