'use client';

import { Button } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { useModal, useToast } from '@/hooks/modal';
import { createAccount, getAccount } from '@/services/account';
import { getSupabaseUserInfo } from '@/services/supabase';
import {
  AccountStatus,
  AccountType,
  AccountTypeLabels,
} from '@/shared/enum/account';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminAuthHandler() {
  const router = useRouter();

  const [step, setStep] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [type, setType] = useState<AccountType | null>(null);

  const { openModal } = useModal();
  const { openToast } = useToast();

  const onCreateAccountHandle = async () => {
    if (!type) {
      openModal({ content: '타입을 선택해주세요' });
      return;
    }

    const { success, error } = await createAccount({ ...user, type });

    if (!success) {
      openToast({
        type: 'error',
        message: '요청에 실패했습니다. 다시 시도해주세요.',
      });
      return;
    }

    setStep(2);
  };

  useEffect(() => {
    (async () => {
      const supabaseUser = await getSupabaseUserInfo();

      if (!supabaseUser) {
        setStep(-1);
        return;
      }

      const { id, user_metadata } = supabaseUser;
      const { email, name, email_verified } = user_metadata;

      setUser({ id, email, name });
      const account = await getAccount(id);

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

      router.push('/admin/dashboard');
    })();
  }, []);

  if (!step) {
    return (
      <>
        <Skeleton.Line height={4} text="관리자 인증 중..." />
      </>
    );
  }

  if (step === -1) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="관리자 로그인해주세요" />

        <Text.PARAGRAPH text="관리자 로그인 후 이용해주세요." />
        <Button.BLUE
          text="관리자 로그인"
          onClick={() => router.push('/admin/login')}
        />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="타입을 선택해주세요" />

        <div className="flex flex-col gap-2">
          {[AccountType.DOCTOR, AccountType.NURSE].map((el) =>
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
        <Text.HEADING text="마스터의 승인을 기다려주세요" />

        <div className="flex flex-col gap-2">
          <Text.PARAGRAPH text={`이름: ${user.name}로 로그인되었습니다.`} />
          <Text.PARAGRAPH
            text={`${user.email} 관리자님, ${AccountTypeLabels[type!]}으로 요청되었습니다.`}
          />
        </div>
      </div>
    );
  }
}
