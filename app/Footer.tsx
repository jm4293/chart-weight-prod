'use client';

import { ChartCandlestick, House, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Text } from '@/components/text';

export const Footer = () => {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const getActiveClass = (path: string) => {
    return pathname.startsWith(path) ? 'text-blue-500' : '';
  };

  const menuItems = [
    { path: '/main', icon: House, label: '메인' },
    // { path: '/time', icon: ChartCandlestick, label: '시간' },
    { path: '/weight', icon: ChartCandlestick, label: '등록' },
    { path: '/user', icon: User, label: '내 정보' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 48) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      className={`
          flex justify-between items-center bg-theme-bg-header
          transition-transform duration-500 ease-in-out
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}>
      {menuItems.map(({ path, icon: Icon, label }) => (
        <Link key={path} href={path} className="flex flex-col items-center">
          <Icon className={getActiveClass(path)} size={18} />
          <Text.PARAGRAPH text={label} className={`${getActiveClass(path)}`} />
        </Link>
      ))}
    </footer>
  );
};
