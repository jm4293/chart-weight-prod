'use client';

import { useState, useRef, useTransition } from 'react';
import NumberPadModal from '@/app/patient/[id]/NumberPadModal';
import { useRouter } from 'next/navigation';
import { Text } from '@/components/text';
import { Button } from '@/components/button';
import { createWeight } from '@/services/weight/action';
import { browserClient } from '@/lib/supabase';

interface IProps {
  patientId: string;
}

export default function WeightRegister(props: IProps) {
  const { patientId } = props;

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [numberModal, setNumberModal] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      startTransition(async () => {
        const supabase = browserClient();

        const { data, error } = await supabase.storage
          .from('images')
          .upload(`${patientId}/${Date.now()}_${file.name}`, file, {
            contentType: file.type,
          });

        if (error) {
          return;
        }

        if (data) {
          const { id, path, fullPath } = data;

          await createWeight({ patientId, weight: null, image: fullPath });
        }

        router.push('/patient');
        fileInputRef.current!.value = '';
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Text.SUBTITLE text="몸무게 등록" />

      {numberModal && (
        <NumberPadModal patientId={patientId} setNumberModal={setNumberModal} />
      )}

      <input
        type="file"
        accept="image/*"
        capture
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-2">
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl">등록 중...</span>
          </div>
        ) : (
          <>
            <Button.BLUE text="사진으로 등록하기" onClick={handleButtonClick} />
            <Button.BLUE
              text="몸무게 입력"
              onClick={() => setNumberModal(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
