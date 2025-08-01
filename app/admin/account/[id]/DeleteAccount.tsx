'use client';

import { Button } from '@/components/button';
import { useModal } from '@/hooks/modal';
import { deleteAccount, IAccountEntity } from '@/services/account';
import { useRouter } from 'next/navigation';

interface IProps {
  account: IAccountEntity;
}

export default function AdminDeleteAccount(props: IProps) {
  const { account } = props;

  const router = useRouter();

  const { openModal, closeModal } = useModal();

  const handleDelete = async () => {
    openModal({
      content: `계정 이메일 "${account.email}"을(를) 삭제하시겠습니까?`,
      confirmText: '삭제',
      onConfirm: async () => {
        await deleteAccount(account.id);
        closeModal();

        router.push('/admin/account');
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return <Button.RED text="계정 삭제" onClick={handleDelete} />;
}
