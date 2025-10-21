'use client';

import { Button } from '@/components/button';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useModal, useToast } from '@/hooks/modal';
import { Text } from '@/components/text';
import { Skeleton } from '@/components/skeleton';
import { IOAuthKakaoResponse, signInCookie } from '@/services/auth';
import {
  createUser,
  getUserInfoByEmail,
  UpdateUserOAuthTokenAction,
} from '@/services/user';
import { UserStatus, UserType, UserTypeLabels } from '@/shared/enum/user';

interface IProps {
  data: IOAuthKakaoResponse;
}

export default function KakaoLogin(props: IProps) {
  const { data } = props;

  const router = useRouter();

  const [step, setStep] = useState<number | null>(null);
  const [type, setType] = useState<UserType | null>(null);

  const { openModal } = useModal();
  const { openToast } = useToast();

  const onCreateAccountHandle = async () => {
    if (!type) {
      openModal({ content: '타입을 선택해주세요' });
      return;
    }

    const { success } = await createUser({
      type,
      email: data.user.email,
      email_type: data.user.email_type,
      name: data.user.name,
      image: data.user.image || null,
    });

    if (!success) {
      setStep(-1);
      openToast({
        type: 'error',
        message: '타입 선택 후 계정 생성에 실패했습니다.',
      });
      return;
    }

    setStep(2);
  };

  useEffect(() => {
    (async () => {
      const { data: userInfo, success } = await getUserInfoByEmail({
        email: data.user.email,
        emailType: data.user.email_type,
      });

      if (!success || !userInfo) {
        setStep(1);
        return;
      }

      if (userInfo.status === UserStatus.PENDING) {
        setStep(2);
        setType(userInfo.type);
        return;
      }

      await UpdateUserOAuthTokenAction({
        userId: userInfo.id,
        provider: userInfo.email_type,
        accessToken: data.token.access_token,
        accessTokenExpiresIn: data.token.access_token_expires_in,
        refreshToken: data.token.refresh_token,
        refreshTokenExpiresIn: data.token.refresh_token_expires_in,
      });

      await signInCookie({ userId: userInfo.id, userUid: userInfo.uuid });

      router.push('/main');
    })();
  }, []);

  if (step === null) {
    return (
      <>
        <Skeleton.Line />
        <Skeleton.Line />
      </>
    );
  }

  if (step === -1) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="오류가 발생했습니다" />

        <div className="flex flex-col gap-2">
          <Text.PARAGRAPH text="타입 선택 후 계정 생성에 실패했습니다." />
          <Text.PARAGRAPH text="잠시 후 다시 시도해주세요." />
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col gap-8">
        <Text.HEADING text="타입을 선택해주세요" />

        <div className="flex flex-col gap-2">
          {[UserType.PATIENT, UserType.DOCTOR, UserType.NURSE].map((el) =>
            type === el ? (
              <Button.BLUE
                key={el}
                text={UserTypeLabels[el]}
                onClick={() => setType(el)}
              />
            ) : (
              <Button.WHITE
                key={el}
                text={UserTypeLabels[el]}
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
      <div className="flex flex-col gap-2">
        <Text.PARAGRAPH
          text={`${data.user.name}님, ${UserTypeLabels[type!]}로 요청되었습니다.`}
        />
        <Text.PARAGRAPH text="관리자 승인을 기다려주세요" />
      </div>
    );
  }

  return (
    <>
      <Skeleton.Line />
      <Skeleton.Line />
    </>
  );
}
