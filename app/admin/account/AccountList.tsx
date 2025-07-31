'use client';

import { Button } from '@/components/button';
import { IAccountEntity } from '@/services/account';
import { AccountStatusLabels, AccountTypeLabels } from '@/shared/enum/account';
import Link from 'next/link';

interface IProps {
  accounts: IAccountEntity[];
}

export default function AccountList(props: IProps) {
  const { accounts } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>타입</th>
          <th>상태</th>
          <th>관리</th>
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
                <Link href={`/admin/account/${account.id}`}>
                  <Button.WHITE text="상세" />
                </Link>
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
