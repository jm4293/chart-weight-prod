'use client';

import { useEffect, useState } from 'react';

export const useDeviceLayout = () => {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
    setIsPending(false);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isPending) {
    return {
      isMobile: null,
      isPending,
    };
  }

  return {
    isMobile: width < 768,
    isPending,
  };
};
