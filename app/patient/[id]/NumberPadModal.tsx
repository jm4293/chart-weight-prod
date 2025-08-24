'use client';

import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { useModal, useToast } from '@/hooks/modal';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { createWeight } from '@/services/weight/action';
import { Text } from '@/components/text';

interface INumberPadModalProps {
  patientId: string;
  setNumberModal: Dispatch<SetStateAction<boolean>>;
}

export default function NumberPadModal(props: INumberPadModalProps) {
  const { patientId, setNumberModal } = props;

  const router = useRouter();

  const [weight, setWeight] = useState('');

  const [isPending, startTransition] = useTransition();

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const handleClick = (val: string) => {
    if (val === '지움') {
      setWeight((prev) => prev.slice(0, -1));
      return;
    }

    if (weight.length === 0 && val === '.') {
      return;
    }

    if (weight.length === 0 && val === '0') {
      return;
    }

    if (val === '.' && weight.includes('.')) {
      return;
    }

    setWeight((prev) => prev + val);
  };

  const handleConfirm = async () => {
    if (weight === '') {
      openModal({
        content: '체중을 입력해주세요',
        onConfirm: () => closeModal(),
      });

      return;
    }

    openModal({
      content: `입력하신 체중이 ${weight}kg 맞습니까?`,
      confirmText: '등록',
      onConfirm: () => {
        closeModal();

        startTransition(async () => {
          await createWeight({ patientId, weight, image: null });

          openToast({ message: '체중이 등록되었습니다.', type: 'success' });
          router.push('/patient');
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleCancel = () => {
    setNumberModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
      <div className="w-5/6 p-4 bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center gap-8 overflow-x-hidden overflow-y-auto">
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl">등록 중...</span>
          </div>
        ) : (
          <>
            <Text.HEADING
              text={weight ? `${weight}kg` : '몸무게를 입력하세요'}
            />

            <div className="w-full grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '지움'].map((num) => (
                <button
                  key={num}
                  className="border rounded"
                  onClick={() => handleClick(num.toString())}>
                  <p
                    className={`p-4 text-2xl ${num === '지움' ? 'text-red-500' : ''}`}>
                    {num}
                  </p>
                </button>
              ))}
            </div>

            <div className="w-full flex gap-2">
              <Button.GRAY text="취소" onClick={handleCancel} />
              <Button.BLUE text="등록" onClick={handleConfirm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
