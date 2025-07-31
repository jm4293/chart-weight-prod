'use client';

import { useState, useRef, useTransition } from 'react';
import NumberPadModal from '@/app/patient/[id]/NumberPadModal';
import { addWeightWithImage } from '@/app/patient/[id]/actions';
import { useRouter } from 'next/navigation';
import { Text } from '@/components/text';
import { Button } from '@/components/button';

interface IProps {
  patientId: string;
}

export default function WeightRegister(props: IProps) {
  const { patientId } = props;

  const router = useRouter();
  // const queryClient = useQueryClient();

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
        // await addWeightWithImage(patientId, file);
        // await queryClient.invalidateQueries({ queryKey: ['weight', id] });

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

      <div className="flex flex-col gap-4">
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl">등록 중...</span>
          </div>
        ) : (
          <>
            {/* <Button.BLUE text="사진으로 등록하기" onClick={handleButtonClick} /> */}
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
