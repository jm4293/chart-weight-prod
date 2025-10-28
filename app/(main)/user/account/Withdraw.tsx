'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useToast } from '@/hooks/modal';
import { WithdrawAction } from '@/services/auth';
import { IUserModel } from '@/services/user';
import { ERROR_CODE } from '@/shared/const';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IProps {
  userInfo: IUserModel;
}

export default function Withdraw(props: IProps) {
  const { userInfo } = props;

  const router = useRouter();

  const { openToast } = useToast();

  const handleWithdraw = async () => {
    if (confirm('정말로 회원 탈퇴를 진행하시겠습니까?')) {
      const { success, code } = await WithdrawAction({
        userId: userInfo.id,
        userUuid: userInfo.uuid,
      });

      if (!success && code === ERROR_CODE.DATABASE_ERROR) {
        openToast({
          type: 'error',
          message:
            '데이터베이스 오류로 인해 회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.',
        });
        return;
      }

      if (!success && code === ERROR_CODE.BAD_REQUEST) {
        openToast({
          type: 'error',
          message:
            '잘못된 요청으로 인해 회원 탈퇴에 실패했습니다. 다시 시도해주세요.',
        });
        return;
      }

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
