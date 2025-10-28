'use client';

import { Button } from '@/components/button';
import { IUserModel } from '@/services/user';
import { useWeightMutation } from '@/services/weight';
import { useRef } from 'react';

interface IProps {
  userInfo: IUserModel;
}

export default function Register(props: IProps) {
  const { userInfo } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createWeight } = useWeightMutation();

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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', String(userInfo.id));
    formData.append('userUuid', userInfo.uuid);

    createWeight.mutate(formData);

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

      <Button
        color="blue"
        text="사진 찍기"
        onClick={handleButtonClick}
        disabled={createWeight.isPending}
      />
    </>
  );
}
