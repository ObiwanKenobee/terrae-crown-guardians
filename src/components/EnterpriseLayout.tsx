import React from 'react';
import { EnterpriseHeader } from './EnterpriseHeader';
import { EnterpriseFooter } from './EnterpriseFooter';

interface EnterpriseLayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

export function EnterpriseLayout({ children, showHero = false }: EnterpriseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <EnterpriseHeader />
      
      {/* Main Content */}
      <main className={`flex-1 ${showHero ? '' : 'pt-20'}`}>
        {children}
      </main>
      
      <EnterpriseFooter />
    </div>
  );
}
