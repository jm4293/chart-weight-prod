'use client';

import { BackButton } from '@/components/button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="grid grid-cols-5 items-center">
      {pathname.split('/').length > 2 ? (
        <div className="cursor-pointer" onClick={() => router.back()}>
          <BackButton />
        </div>
      ) : (
        <div style={{ width: '24px' }} />
      )}

      <Image
        src="/logo-long.png"
        alt="Logo"
        width={180}
        height={60}
        className="col-span-3 justify-self-center"
      />
    </header>
  );
}
