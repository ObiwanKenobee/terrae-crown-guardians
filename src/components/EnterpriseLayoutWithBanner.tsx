import { EnterpriseHeader } from './EnterpriseHeader';
import { EnterpriseFooter } from './EnterpriseFooter';
import FloatingFundingCard from './FloatingFundingCard';
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
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Main Header */}
      <EnterpriseHeader showHero={showHero} />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <EnterpriseFooter />

      {/* Floating Funding Card - Positioned over content */}
      {bannerVisible && (
        <FloatingFundingCard
          onClose={handleCloseBanner}
        />
      )}
    </div>
  );
};
