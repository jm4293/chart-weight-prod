'use client';

import { Button } from '@/components/button';
import { IUserModel } from '@/services/user';
import { createWeight } from '@/services/weight';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';

interface IProps {
  userInfo: IUserModel;
}

export default function Register(props: IProps) {
  const { userInfo } = props;

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert('파일이 선택되지 않았습니다.');
      return;
    }

    await createWeight({ userInfo, file });

    alert('몸무게가 성공적으로 등록되었습니다.');
    router.push('/user/weight');

    fileInputRef.current!.value = '';
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        capture
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Button.BLUE text="사진 찍기" onClick={handleButtonClick} />
    </>
  );
}
