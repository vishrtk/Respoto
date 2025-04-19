'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const headerVariants = cva(
  'flex items-center justify-between w-full px-6 py-4 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border-b border-gray-200',
        transparent: 'bg-transparent',
        colored: 'bg-purple-50',
        dark: 'bg-gray-900 text-white',
        instagram: 'bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200',
      },
      sticky: {
        true: 'sticky top-0 z-30',
        false: 'relative',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      sticky: true,
      shadow: 'sm',
    },
  }
);

export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ 
    className, 
    variant, 
    sticky,
    shadow,
    logo,
    actions,
    children, 
    ...props 
  }, ref) => {
    return (
      <header
        className={headerVariants({ variant, sticky, shadow, className })}
        ref={ref}
        {...props}
      >
        <div className="flex items-center">
          {logo && <div className="mr-4">{logo}</div>}
          <div>{children}</div>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-4">
            {actions}
          </div>
        )}
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
