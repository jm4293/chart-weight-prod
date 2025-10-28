'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { signOutAction } from '@/services/auth';
import { ChevronRight } from 'lucide-react';

export default function SignOut() {
  const handleSignOut = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await signOutAction();
    }
  };

  return (
    <Wrapper.SECTION>
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleSignOut}>
        <Text.HEADING text="로그아웃" className="text-red-500" />
        <ChevronRight />
      </div>
    </Wrapper.SECTION>
  );
}
