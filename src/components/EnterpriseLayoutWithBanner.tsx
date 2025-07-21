import { EnterpriseHeader } from './EnterpriseHeader';
import { EnterpriseFooter } from './EnterpriseFooter';
import FloatingFundingBanner from './FloatingFundingBanner';
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
      {/* Compact Floating Funding Banner */}
      {bannerVisible && (
        <FloatingFundingBanner
          onClose={handleCloseBanner}
          position="top"
        />
      )}

      {/* Main Header with minimal top padding to account for floating banner */}
      <div className={bannerVisible ? "pt-16" : ""}>
        <EnterpriseHeader showHero={showHero} />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <EnterpriseFooter />
    </div>
  );
};
