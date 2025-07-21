import { EnterpriseHeader } from './EnterpriseHeader';
import { EnterpriseFooter } from './EnterpriseFooter';
import FundingBannerHeader from './FundingBannerHeader';
import { useFundingBanner } from '@/hooks/useFundingBanner';

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
  const { isVisible: bannerVisible, dismissBanner } = useFundingBanner(showFundingBanner);

  const handleCloseBanner = () => {
    dismissBanner(true);
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
