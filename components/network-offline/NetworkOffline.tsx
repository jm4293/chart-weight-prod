import { useEffect, useState } from 'react';

export const NetworkOffline = () => {
  const [isNetworkOffline, setIsNetworkOffline] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return !navigator.onLine;
  });

  const handleOnOffLine = () => {
    setIsNetworkOffline(() => !navigator.onLine);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsNetworkOffline(!navigator.onLine);

    window.addEventListener('online', handleOnOffLine);
    window.addEventListener('offline', handleOnOffLine);

    return () => {
      window.removeEventListener('online', handleOnOffLine);
      window.removeEventListener('offline', handleOnOffLine);
    };
  }, []);

  return { isNetworkOffline };
};
