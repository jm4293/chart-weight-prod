import Image from 'next/image';
import logo from '@/public/logo.png';

export default function Header() {
  return (
    <div className="w-full flex justify-center py-8">
      <Image src={logo} alt="logo" width={320} priority />
    </div>
  );
}
