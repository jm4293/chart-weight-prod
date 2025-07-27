'use client';

import { Button } from '@/components/button';
import LineSkeleton from '@/components/skeleton';
import {
  AccountStatus,
  AccountType,
  AccountTypeLabels,
  createAccount,
  findByAccountId,
} from '@/services/account';
import { browserClient } from '@/utils/supabase';
import { useEffect, useRef, useState } from 'react';

const getSupabaseUser = async () => {
  const supabase = browserClient();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    return data.user;
  }

  return null;
};

export default function AuthHandler() {
  const supabaseUserRef = useRef<any>(null);

  const [step, setStep] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  useEffect(() => {
    (async () => {
      const supabaseUser = await getSupabaseUser();

      if (!supabaseUser) {
        return;
      }

      supabaseUserRef.current = supabaseUser;

      const account = await findByAccountId(supabaseUserRef.current.id);

      if (!account) {
        setStep(1);
        return;
      }

      const { type, status } = account;

      if (status === AccountStatus.PENDING) {
        setStep(2);
        setSelectedType(type);
        return;
      }
    })();
  }, []);

  const onCreateAccountHandle = async () => {
    if (!selectedType) {
      alert('타입을 선택해주세요');
      return;
    }

    const ret = await createAccount({
      id: supabaseUserRef.current.id,
      email: supabaseUserRef.current.email,
      name: supabaseUserRef.current.user_metadata.name,
      type: selectedType as AccountType,
    });

    if (!ret) {
      alert('요청에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    setStep(2);
  };

  if (!step) {
    return (
      <>
        <LineSkeleton height={4} text="사용자 인증 중..." />
      </>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-8">
        <strong className="text-4xl">타입을 선택해주세요</strong>

        <div className="flex flex-col gap-4">
          {Object.values(AccountType)
            .filter((type) =>
              [
                AccountType.DOCTOR,
                AccountType.NURSE,
                AccountType.PATIENT,
                AccountType.FAMILY,
              ].includes(type as AccountType),
            )
            .map((type) => (
              <Button
                key={type}
                text={AccountTypeLabels[type as AccountType]}
                color={selectedType === type ? 'blue' : 'white'}
                onClick={() => {
                  setSelectedType(type as AccountType);
                }}
              />
            ))}
        </div>

        <Button color="blue" text="요청하기" onClick={onCreateAccountHandle} />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-8">
        <strong className="text-4xl">계정을 확인 중입니다.</strong>
        <p className="text-lg">
          {supabaseUserRef.current.email}로 로그인되었습니다.
        </p>
        <p className="text-lg">
          {supabaseUserRef.current.user_metadata.name}님,{' '}
          {AccountTypeLabels[selectedType!]}으로 요청되었습니다.
        </p>
      </div>
    );
  }
}
