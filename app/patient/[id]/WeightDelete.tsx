'use client';

import { useTransition } from 'react';
import { useModal, useToast } from '@/hooks/modal';
import { IWeightEntity } from '@/services/weight';
import { deleteWeight } from '@/services/weight/action';
import { useRouter } from 'next/navigation';

interface IProps {
  weight: IWeightEntity;
}

export default function WeightDelete(props: IProps) {
  const { weight } = props;

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    openModal({
      content: weight.weight
        ? `${weight.weight}kg 기록을 삭제하시겠습니까?`
        : `사진 기록을 삭제하시겠습니까?`,
      confirmText: '삭제',
      onConfirm: () => {
        closeModal();
        startTransition(async () => {
          await deleteWeight(weight.id);

          openToast({
            type: 'success',
            message: weight.weight
              ? `${weight.weight}kg 기록이 삭제되었습니다.`
              : `사진 기록이 삭제되었습니다.`,
          });
          closeModal();
          router.refresh();
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return (
    <button
      className="text-red-500 hover:underline disabled:opacity-50"
      onClick={handleDelete}>
      {isPending ? '삭제 중...' : '삭제'}
    </button>
  );
}
