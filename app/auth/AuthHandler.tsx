'use client';

import { Button } from '@/components/button';
import LineSkeleton from '@/components/skeleton';
import { createAccount, findByAccountId } from '@/services/account';
import {
  AccountStatus,
  AccountType,
  AccountTypeLabels,
} from '@/shared/enum/account';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/modal';
import { getSupabaseUser } from '@/services/supabase';
import { Text } from '@/components/text';

export default function AuthHandler() {
  const router = useRouter();

  const [step, setStep] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [type, setType] = useState<AccountType | null>(null);

  const { openModal } = useModal();

  const onCreateAccountHandle = async () => {
    if (!type) {
      openModal({ content: '타입을 선택해주세요' });
      return;
    }

    const ret = await createAccount({ ...user, type });

    if (!ret) {
      alert('요청에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    setStep(2);
  };

  useEffect(() => {
    (async () => {
      const supabaseUser = await getSupabaseUser();

      if (!supabaseUser) {
        setStep(-1);
        return;
      }

      const { id, user_metadata } = supabaseUser;
      const { email, full_name } = user_metadata;

      setUser({ id, email, name: full_name });
      const account = await findByAccountId(id);

      if (!account) {
        setStep(1);
        return;
      }

      const { type, status } = account;

      if (status === AccountStatus.PENDING) {
        setStep(2);
        setType(type);
        return;
      }

      router.push('/patient');
    })();
  }, []);

  if (!step) {
    return (
      <>
        <LineSkeleton height={4} text="사용자 인증 중..." />
      </>
    );
  }

  if (step === -1) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="로그인해주세요" />

        <Text.PARAGRAPH text={`로그인 후 계정을 생성해주세요.`} />
        <Button.BLUE text="로그인" onClick={() => router.push('/login')} />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="타입을 선택해주세요" />

        <div className="flex flex-col gap-4">
          {[
            AccountType.DOCTOR,
            AccountType.NURSE,
            AccountType.PATIENT,
            AccountType.FAMILY,
          ].map((el) =>
            type === el ? (
              <Button.BLUE
                key={el}
                text={AccountTypeLabels[el]}
                onClick={() => setType(el)}
              />
            ) : (
              <Button.WHITE
                key={el}
                text={AccountTypeLabels[el]}
                onClick={() => setType(el)}
              />
            ),
          )}
        </div>

        <Button.BLUE text="선택하기" onClick={onCreateAccountHandle} />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="관리자의 승인을 기다려주세요" />

        <Text.PARAGRAPH text={`이름: ${user.name}로 로그인되었습니다.`} />
        <Text.PARAGRAPH
          text={`${user.name}님, ${AccountTypeLabels[type!]}으로 요청되었습니다.`}
        />
      </div>
    );
  }
}
