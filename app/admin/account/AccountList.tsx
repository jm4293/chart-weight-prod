'use client';

import { Button } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { useModal } from '@/hooks/modal';
import {
  getAccountList,
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
  const { openModal } = useModal();

  const onClickHandle = (account: IAccountEntity) => {
    openModal({
      title: '계정 상태 변경',
      content: (
        <>
          <p>이름: {account.name}</p>
          <p>이메일: {account.email}</p>
          <p>타입: {AccountTypeLabels[account.type]}</p>
          <p>상태: {AccountStatusLabels[account.status]}</p>
        </>
      ),
      confirmText: '활성',
      onConfirm: async () => {
        await updateAccountStatus(account.id, AccountStatus.ACTIVE);

        startTransition(async () => {
          const ret = await getAccountList();
          setAccounts(ret);
        });
      },
      cancelText: '정지',
      onCancel: async () => {
        await updateAccountStatus(account.id, AccountStatus.SUSPENDED);

        startTransition(async () => {
          const ret = await getAccountList();
          setAccounts(ret);
        });
      },
    });
  };

  useEffect(() => {
    startTransition(async () => {
      const ret = await getAccountList();
      setAccounts(ret);
    });
  }, []);

  if (!accounts) {
    return <></>;
  }

  if (isPending) {
    return <Skeleton.Line height={4} text="계정 정보를 불러오는 중..." />;
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
                <Button.WHITE
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
