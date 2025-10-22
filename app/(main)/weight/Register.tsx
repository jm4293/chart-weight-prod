'use client';

import { Button } from '@/components/button';
import { IUserModel } from '@/services/user';
import { createWeight } from '@/services/weight';
import { useRef, useState } from 'react';
import Loading from '../loading';
import { useToast } from '@/hooks/modal';

interface IProps {
  userInfo: IUserModel;
}

export default function Register(props: IProps) {
  const { userInfo } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { openToast } = useToast();

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

    setIsLoading(true);

    try {
      await createWeight({ userInfo, file });

      openToast({
        type: 'success',
        message: '몸무게가 성공적으로 등록되었습니다.',
      });
    } catch (error) {
      openToast({
        type: 'error',
        message: '등록 중 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
      fileInputRef.current!.value = '';
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <input
        type="file"
        accept="image/*"
        capture
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Button.BLUE
        text="사진 찍기"
        onClick={handleButtonClick}
        disabled={isLoading}
      />
    </>
  );
}
