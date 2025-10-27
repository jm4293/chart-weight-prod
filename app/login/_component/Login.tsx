'use client';

import { Button } from '@/components/button';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useModal, useToast } from '@/hooks/modal';
import { LinkText, Text } from '@/components/text';
import { Skeleton } from '@/components/skeleton';
import { IOAuthResponse, signInCookie } from '@/services/auth';
import {
  createUser,
  getUserInfoByEmail,
  UpdateUserOAuthTokenAction,
} from '@/services/user';
import { UserStatus, UserType, UserTypeLabels } from '@/shared/enum/user';
import { Input } from '@/components/input';
import { Wrapper } from '@/components/wrapper';

interface IProps {
  data: IOAuthResponse;
}

export default function Login(props: IProps) {
  const { data } = props;

  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [type, setType] = useState<UserType | null>(null);
  const [name, setName] = useState<string>('');

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const handleCreateAccount = async () => {
    if (!name.trim()) {
      openModal({
        content: '이름을 입력해주세요',
        onConfirm: () => closeModal(),
      });
      return;
    }

    const { success } = await createUser({
      type: type!,
      email: data.user.email,
      emailType: data.user.emailType,
      name,
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

    setStep(4);
  };

  const handleTypeSelection = () => {
    if (!type) {
      openModal({ content: '타입을 선택해주세요' });
      return;
    }

    setStep(3);
  };

  useEffect(() => {
    (async () => {
      setName(data.user.name);

      const { data: userInfo, success } = await getUserInfoByEmail({
        email: data.user.email,
        emailType: data.user.emailType,
      });

      if (!userInfo) {
        setStep(2);
        return;
      }

      if (userInfo.status === UserStatus.PENDING) {
        setStep(4);
        setType(userInfo.type);
        return;
      }

      await UpdateUserOAuthTokenAction({
        userId: userInfo.id,
        userUuid: userInfo.uuid,
        provider: userInfo.emailType,
        accessToken: data.token.access_token,
        accessTokenExpiresIn: data.token.access_token_expires_in,
        refreshToken: data.token.refresh_token,
        refreshTokenExpiresIn: data.token.refresh_token_expires_in,
      });

      await signInCookie({ userId: userInfo.id, userUid: userInfo.uuid });

      openToast({
        type: 'success',
        message: `${userInfo.name}님, 환영합니다!`,
      });
      router.push('/main');
    })();
  }, []);

  if (step === -1) {
    return (
      <Wrapper.SECTION text="로그인 오류">
        <Text.HEADING text="오류가 발생했습니다" />

        <div className="flex flex-col gap-2">
          <Text.PARAGRAPH text="타입 선택 후 계정 생성에 실패했습니다." />
          <Text.PARAGRAPH text="잠시 후 다시 시도해주세요." />
        </div>
      </Wrapper.SECTION>
    );
  }

  if (step === 2) {
    return (
      <Wrapper.SECTION text="타입 선택">
        <div className="flex flex-col gap-2">
          {[UserType.PATIENT, UserType.DOCTOR, UserType.NURSE].map((el) =>
            type === el ? (
              <Button
                key={el}
                color="blue"
                text={UserTypeLabels[el]}
                onClick={() => setType(el)}
              />
            ) : (
              <Button
                key={el}
                color="white"
                text={UserTypeLabels[el]}
                onClick={() => setType(el)}
              />
            ),
          )}
        </div>

        <Button color="blue" text="다음" onClick={handleTypeSelection} />
      </Wrapper.SECTION>
    );
  }

  if (step === 3) {
    return (
      <Wrapper.SECTION text="이름 확인">
        <Input
          type="text"
          name="name"
          title="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button color="blue" text="등록하기" onClick={handleCreateAccount} />
      </Wrapper.SECTION>
    );
  }

  if (step === 4) {
    return (
      <>
        <Wrapper.SECTION text="승인 대기 중">
          <Text.PARAGRAPH
            text={`${name}님, ${UserTypeLabels[type!]}로 요청되었습니다.`}
          />
          <Text.PARAGRAPH text="관리자 승인을 기다려주세요" />
        </Wrapper.SECTION>
        <Wrapper.SECTION>
          <LinkText href="/login" text="로그인 페이지로 이동" />
        </Wrapper.SECTION>
      </>
    );
  }

  return (
    <Wrapper.SECTION>
      <Skeleton.Line />
      <Skeleton.Line />
    </Wrapper.SECTION>
  );
}
