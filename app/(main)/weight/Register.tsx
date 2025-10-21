'use client';

import { Button } from '@/components/button';
import { browserClient } from '@/lib/supabase';
import { IUserModel } from '@/services/user';
import { useRef, useTransition } from 'react';

interface IProps {
  userInfo: IUserModel;
}

export default function Register(props: IProps) {
  const { userInfo } = props;

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

    startTransition(async () => {
      // const supabase = browserClient();
      // const { data, error } = await supabase.storage
      //   .from('images')
      //   .upload(`${patientId}/${Date.now()}_${file.name}`, file, {
      //     contentType: file.type,
      //   });
      // if (error) {
      //   return;
      // }
      // if (data) {
      //   const { id, path, fullPath } = data;
      //   await createWeight({ patientId, weight: null, image: fullPath });
      // }
      // router.push('/patient');
    });

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
