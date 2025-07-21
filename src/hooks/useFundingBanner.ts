import { useState, useEffect } from 'react';

export const useFundingBanner = (defaultVisible: boolean = true) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [isDismissedPermanently, setIsDismissedPermanently] = useState(false);

  useEffect(() => {
    // Check if banner was permanently dismissed
    const dismissed = localStorage.getItem('funding-banner-dismissed');
    const dismissedDate = localStorage.getItem('funding-banner-dismissed-date');
    
    if (dismissed === 'true') {
      // Check if dismissal was more than 7 days ago
      if (dismissedDate) {
        const dismissedTime = new Date(dismissedDate).getTime();
        const currentTime = new Date().getTime();
        const daysDifference = (currentTime - dismissedTime) / (1000 * 3600 * 24);
        
        // Show banner again after 7 days
        if (daysDifference > 7) {
          localStorage.removeItem('funding-banner-dismissed');
          localStorage.removeItem('funding-banner-dismissed-date');
          setIsVisible(defaultVisible);
          setIsDismissedPermanently(false);
        } else {
          setIsVisible(false);
          setIsDismissedPermanently(true);
        }
      } else {
        setIsVisible(false);
        setIsDismissedPermanently(true);
      }
    }
  }, [defaultVisible]);

  const dismissBanner = (permanent: boolean = false) => {
    setIsVisible(false);
    
    if (permanent) {
      localStorage.setItem('funding-banner-dismissed', 'true');
      localStorage.setItem('funding-banner-dismissed-date', new Date().toISOString());
      setIsDismissedPermanently(true);
    }
  };

  const showBanner = () => {
    setIsVisible(true);
    setIsDismissedPermanently(false);
    localStorage.removeItem('funding-banner-dismissed');
    localStorage.removeItem('funding-banner-dismissed-date');
  };

  return {
    isVisible,
    isDismissedPermanently,
    dismissBanner,
    showBanner
  };
};
