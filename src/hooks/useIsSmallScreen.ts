import { useState, useEffect } from 'react'

interface useIsSmallScreenState {
  isSmallScreen: boolean
}

interface useIsSmallScreenProps {
  breakpoint: number
}

export const useIsSmallScreen = (breakpoint: useIsSmallScreenProps['breakpoint']): boolean => {
  const [isSmallScreen, setIsSmallScreen] = useState<useIsSmallScreenState['isSmallScreen']>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isSmallScreen;
}
