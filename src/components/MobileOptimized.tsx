import React from 'react';
import { cn } from '../lib/utils';

/**
 * Mobile-optimized wrapper components for AEGIS: Regina Terrae
 * These ensure consistent responsive behavior across all platform components
 */

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div className={cn(
      "min-h-screen",
      "px-4 sm:px-6 lg:px-8", // Progressive padding
      "py-4 sm:py-6 lg:py-8", // Progressive vertical spacing
      "max-w-7xl mx-auto", // Centered with max width
      className
    )}>
      {children}
    </div>
  );
}

interface MobileGridProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'cards' | 'stats' | 'features' | 'partners' | 'packages';
}

export function MobileGrid({ children, className, variant = 'cards' }: MobileGridProps) {
  const variantClasses = {
    'cards': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
    'stats': 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4',
    'features': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
    'partners': 'grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6',
    'packages': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}

interface MobileTabsProps {
  children: React.ReactNode;
  className?: string;
  tabCount: number;
}

export function MobileTabs({ children, className, tabCount }: MobileTabsProps) {
  const getTabCols = () => {
    if (tabCount <= 3) return 'grid-cols-3';
    if (tabCount <= 4) return 'grid-cols-2 md:grid-cols-4';
    if (tabCount <= 6) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className={cn(
      'grid w-full gap-1 md:gap-0 h-auto md:h-10',
      getTabCols(),
      className
    )}>
      {children}
    </div>
  );
}

interface MobileStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal' | 'responsive';
  spacing?: 'tight' | 'normal' | 'loose';
}

export function MobileStack({ 
  children, 
  className, 
  direction = 'responsive',
  spacing = 'normal'
}: MobileStackProps) {
  const directionClasses = {
    'vertical': 'flex flex-col',
    'horizontal': 'flex flex-row flex-wrap',
    'responsive': 'flex flex-col md:flex-row'
  };

  const spacingClasses = {
    'tight': 'gap-2 md:gap-3',
    'normal': 'gap-4 md:gap-6',
    'loose': 'gap-6 md:gap-8'
  };

  return (
    <div className={cn(
      directionClasses[direction],
      spacingClasses[spacing],
      'items-start md:items-center',
      className
    )}>
      {children}
    </div>
  );
}

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function MobileCard({ 
  children, 
  className, 
  padding = 'md',
  interactive = false
}: MobileCardProps) {
  const paddingClasses = {
    'sm': 'p-3 md:p-4',
    'md': 'p-4 md:p-6',
    'lg': 'p-6 md:p-8'
  };

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm border',
      paddingClasses[padding],
      interactive && 'hover:shadow-md transition-shadow duration-200 cursor-pointer',
      'overflow-hidden', // Prevent content overflow on mobile
      className
    )}>
      {children}
    </div>
  );
}

interface MobileButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'responsive';
}

export function MobileButtonGroup({ 
  children, 
  className, 
  variant = 'responsive'
}: MobileButtonGroupProps) {
  const variantClasses = {
    'horizontal': 'flex flex-row gap-2 flex-wrap',
    'vertical': 'flex flex-col gap-2',
    'responsive': 'flex flex-col sm:flex-row gap-2 sm:gap-3'
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}

interface MobileTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
}

export function MobileText({ 
  children, 
  as: Component = 'p', 
  size = 'base',
  className 
}: MobileTextProps) {
  const sizeClasses = {
    'xs': 'text-xs sm:text-sm',
    'sm': 'text-sm sm:text-base',
    'base': 'text-base sm:text-lg',
    'lg': 'text-lg sm:text-xl',
    'xl': 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl md:text-5xl',
    '4xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
  };

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  );
}

// Utility function to make any component mobile-friendly
export function withMobileOptimization<T extends Record<string, any>>(
  Component: React.ComponentType<T>
) {
  return React.forwardRef<any, T>((props, ref) => {
    return (
      <div className="touch-manipulation">
        <Component {...props} ref={ref} />
      </div>
    );
  });
}

// Hook for mobile-specific behavior
export function useMobileDetection() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
}

// Mobile-optimized input component
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export function MobileInput({ 
  label, 
  error, 
  fullWidth = true, 
  className, 
  ...props 
}: MobileInputProps) {
  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
          'text-base', // Prevents zoom on iOS
          'min-h-[44px]', // Touch-friendly minimum height
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

// Mobile-optimized dialog/modal
interface MobileDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function MobileDialog({ 
  children, 
  isOpen, 
  onClose, 
  title,
  size = 'md'
}: MobileDialogProps) {
  const sizeClasses = {
    'sm': 'sm:max-w-sm',
    'md': 'sm:max-w-md',
    'lg': 'sm:max-w-lg',
    'xl': 'sm:max-w-xl',
    'full': 'sm:max-w-none'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        
        <div className={cn(
          'inline-block w-full transform overflow-hidden rounded-t-lg sm:rounded-lg',
          'bg-white text-left align-bottom shadow-xl transition-all',
          'sm:my-8 sm:align-middle',
          sizeClasses[size]
        )}>
          {title && (
            <div className="border-b border-gray-200 px-4 py-3 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            </div>
          )}
          <div className="px-4 py-3 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export all components
export {
  MobileContainer,
  MobileGrid,
  MobileTabs,
  MobileStack,
  MobileCard,
  MobileButtonGroup,
  MobileText,
  MobileInput,
  MobileDialog,
  useMobileDetection,
  withMobileOptimization
};
