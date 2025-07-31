'use client';

import { LinkButton } from '@/components/button';
import { IAccountEntity } from '@/services/account';
import { AccountStatusLabels, AccountTypeLabels } from '@/shared/enum/account';
import Link from 'next/link';

interface IProps {
  accounts: IAccountEntity[];
}

export default function AccountList(props: IProps) {
  const { accounts } = props;

  return (
    <div className="flex flex-col gap-8">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th colSpan={2}>이메일</th>
            <th>타입</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <Link href={`/admin/account/${account.id}`} key={account.id}>
                <tr key={account.id} className="hover:bg-gray-100">
                  <td>{account.name}</td>
                  <td colSpan={2}>{account.email}</td>
                  <td>{AccountTypeLabels[account.type]}</td>
                  <td>{AccountStatusLabels[account.status]}</td>
                </tr>
              </Link>
            ))
          ) : (
            <tr>
              <td colSpan={3}>사용자가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <LinkButton.GRAY text="대시보드로 돌아가기" href="/admin/dashboard" />
    </div>
  );
}
