'use client';

import { Button } from '@/components/button';
import { useModal } from '@/hooks/modal';
import { deletePatient, IPatientEntity } from '@/services/patient';
import { useRouter } from 'next/navigation';

interface IProps {
  patient: IPatientEntity;
}

export default function AdminDeletePatient(props: IProps) {
  const { patient } = props;

  const router = useRouter();

  const { openModal, closeModal } = useModal();

  const handleDelete = async () => {
    openModal({
      content: `환자명 "${patient.name}"을(를) 삭제하시겠습니까?`,
      confirmText: '삭제',
      onConfirm: async () => {
        await deletePatient(patient.id);
        closeModal();

        router.push('/admin/patient');
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return <Button.RED text="환자 삭제" onClick={handleDelete} />;
}
