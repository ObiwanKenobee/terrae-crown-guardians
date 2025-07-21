import React from 'react';
import { cn } from '../lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
}

export function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = '7xl',
  padding = 'md',
  center = true
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full'
  };

  const paddingClasses = {
    'none': '',
    'sm': 'px-2 sm:px-4',
    'md': 'px-4 sm:px-6 lg:px-8',
    'lg': 'px-6 sm:px-8 lg:px-12',
    'xl': 'px-8 sm:px-12 lg:px-16'
  };

  return (
    <div className={cn(
      'w-full',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      center && 'mx-auto',
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  autoFit?: boolean;
  minWidth?: string;
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 'md',
  autoFit = false,
  minWidth = '300px'
}: ResponsiveGridProps) {
  const gapClasses = {
    'sm': 'gap-2 sm:gap-3',
    'md': 'gap-4 sm:gap-6',
    'lg': 'gap-6 sm:gap-8',
    'xl': 'gap-8 sm:gap-12'
  };

  const getGridCols = () => {
    if (autoFit) {
      return `grid-cols-[repeat(auto-fit,minmax(${minWidth},1fr))]`;
    }
    
    const colClasses = [];
    if (cols.default) colClasses.push(`grid-cols-${cols.default}`);
    if (cols.sm) colClasses.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) colClasses.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) colClasses.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) colClasses.push(`xl:grid-cols-${cols.xl}`);
    
    return colClasses.join(' ');
  };

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal' | 'responsive';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

export function ResponsiveStack({ 
  children, 
  className,
  direction = 'responsive',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false
}: ResponsiveStackProps) {
  const directionClasses = {
    'vertical': 'flex-col',
    'horizontal': 'flex-row',
    'responsive': 'flex-col md:flex-row'
  };

  const alignClasses = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch'
  };

  const justifyClasses = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  };

  const gapClasses = {
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
    'xl': 'gap-8'
  };

  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
}

export function ResponsiveCard({ 
  children, 
  className,
  padding = 'md',
  hover = false,
  interactive = false
}: ResponsiveCardProps) {
  const paddingClasses = {
    'sm': 'p-3 sm:p-4',
    'md': 'p-4 sm:p-6',
    'lg': 'p-6 sm:p-8',
    'xl': 'p-8 sm:p-12'
  };

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm border',
      paddingClasses[padding],
      hover && 'hover:shadow-md transition-shadow duration-200',
      interactive && 'cursor-pointer interactive-element',
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  responsive?: boolean;
}

export function ResponsiveText({ 
  children, 
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  className,
  responsive = true
}: ResponsiveTextProps) {
  const sizeClasses = responsive ? {
    'xs': 'text-responsive-xs',
    'sm': 'text-responsive-sm',
    'base': 'text-responsive-base',
    'lg': 'text-responsive-lg',
    'xl': 'text-responsive-xl',
    '2xl': 'text-responsive-2xl',
    '3xl': 'text-responsive-3xl',
    '4xl': 'text-4xl sm:text-5xl lg:text-6xl',
    '5xl': 'text-5xl sm:text-6xl lg:text-7xl',
    '6xl': 'text-6xl sm:text-7xl lg:text-8xl'
  } : {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const weightClasses = {
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold'
  };

  return (
    <Component className={cn(
      sizeClasses[size],
      weightClasses[weight],
      className
    )}>
      {children}
    </Component>
  );
}

export { ResponsiveContainer as Container };
export { ResponsiveGrid as Grid };
export { ResponsiveStack as Stack };
export { ResponsiveCard as Card };
export { ResponsiveText as Text };
