import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-center items-center">
      <Image src="/logo-long.png" alt="Logo" width={180} height={60} />
    </header>
  );
}
