import { useState, useEffect } from 'react';
import { EnterpriseHeader } from './EnterpriseHeader';
import { EnterpriseFooter } from './EnterpriseFooter';
import FundingBannerHeader from './FundingBannerHeader';

interface EnterpriseLayoutWithBannerProps {
  children: React.ReactNode;
  showHero?: boolean;
  showFundingBanner?: boolean;
}

export const EnterpriseLayoutWithBanner = ({ 
  children, 
  showHero = false, 
  showFundingBanner = true 
}: EnterpriseLayoutWithBannerProps) => {
  const [bannerVisible, setBannerVisible] = useState(showFundingBanner);

  // Check if banner was previously dismissed (localStorage)
  useEffect(() => {
    const bannerDismissed = localStorage.getItem('funding-banner-dismissed');
    if (bannerDismissed === 'true') {
      setBannerVisible(false);
    }
  }, []);

  const handleCloseBanner = () => {
    setBannerVisible(false);
    localStorage.setItem('funding-banner-dismissed', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Funding Banner */}
      {bannerVisible && (
        <FundingBannerHeader 
          onClose={handleCloseBanner}
          showCloseButton={true}
        />
      )}
      
      {/* Main Header */}
      <EnterpriseHeader showHero={showHero} />
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <EnterpriseFooter />
    </div>
  );
};
