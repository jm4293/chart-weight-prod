'use client';

import { Button } from '@/components/button';
import { useModal } from '@/hooks/modal';
import {
  findAllAccounts,
  IAccountEntity,
  updateAccountStatus,
} from '@/services/account';
import {
  AccountStatus,
  AccountStatusLabels,
  AccountTypeLabels,
} from '@/shared/enum/account';
import { useEffect, useState, useTransition } from 'react';

export default function AccountList() {
  const [accounts, setAccounts] = useState<IAccountEntity[] | null>(null);

  const [isPending, startTransition] = useTransition();
  const { openModal, closeModal } = useModal();

  const onClickHandle = (account: IAccountEntity) => {
    openModal({
      title: '계정 상태 변경',
      content: (
        <div>
          <p>이름: {account.name}</p>
          <p>이메일: {account.email}</p>
          <p>타입: {AccountTypeLabels[account.type]}</p>
          <p>상태: {AccountStatusLabels[account.status]}</p>
        </div>
      ),
      confirmText: '승인',
      onConfirm: async () => {
        await updateAccountStatus(account.id, AccountStatus.ACTIVE);

        startTransition(async () => {
          const ret = await findAllAccounts();
          setAccounts(ret);
        });
      },
      cancelText: '정지',
      onCancel: async () => {
        await updateAccountStatus(account.id, AccountStatus.SUSPENDED);

        startTransition(async () => {
          const ret = await findAllAccounts();
          setAccounts(ret);
        });
      },
    });
  };

  useEffect(() => {
    startTransition(async () => {
      const ret = await findAllAccounts();
      setAccounts(ret);
    });
  }, []);

  if (!accounts) {
    return <div>계정 정보를 불러오는 중...</div>;
  }

  if (isPending) {
    return <div>계정 정보를 불러오는 중...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>타입</th>
          <th>상태</th>
          <th>등록</th>
        </tr>
      </thead>
      <tbody>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.email}</td>
              <td>{AccountTypeLabels[account.type]}</td>
              <td>{AccountStatusLabels[account.status]}</td>
              <td>
                <Button
                  color="white"
                  text="상세"
                  onClick={() => onClickHandle(account)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>사용자가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
