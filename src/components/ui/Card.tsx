'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
        elevated: 'bg-white shadow-md hover:shadow-lg',
        outline: 'bg-white border border-gray-200',
        ghost: 'bg-gray-50 hover:bg-gray-100',
        instagram: 'bg-gradient-to-br from-purple-50 to-pink-50 border border-gray-200 shadow-sm hover:shadow-md',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-7',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      fullWidth: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  isInteractive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, fullWidth, isInteractive, children, ...props }, ref) => {
    return (
      <div
        className={`${cardVariants({ variant, padding, fullWidth, className })} ${
          isInteractive ? 'cursor-pointer transform hover:-translate-y-1' : ''
        }`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-3 ${className}`} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${className}`} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mt-4 flex items-center ${className}`} {...props} />
);

export default Card;
