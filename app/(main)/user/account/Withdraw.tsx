'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { WithdrawAction } from '@/services/auth';
import { IUserModel } from '@/services/user';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IProps {
  userInfo: IUserModel;
}

export function Withdraw(props: IProps) {
  const { userInfo } = props;

  const router = useRouter();

  const handleWithdraw = async () => {
    if (confirm('정말로 회원 탈퇴를 진행하시겠습니까?')) {
      await WithdrawAction({
        userId: userInfo.id,
        userUid: userInfo.uuid,
      });

      alert('회원 탈퇴가 완료되었습니다.');
      router.push('/main');
    }
  };

  return (
    <Wrapper.SECTION>
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleWithdraw}>
        <Text.HEADING text="회원 탈퇴" className="text-red-500" />
        <ChevronRight />
      </div>
    </Wrapper.SECTION>
  );
}
