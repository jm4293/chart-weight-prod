import { Text } from '@/components/text';
import { IAccountEntity } from '@/services/account';
import { AccountStatusLabels, AccountTypeLabels } from '@/shared/enum/account';
import Link from 'next/link';

interface IProps {
  accountList: IAccountEntity[];
}

export default function AccountList(props: IProps) {
  const { accountList } = props;

  if (!accountList || accountList.length === 0) {
    return <Text.HEADING text="관리자 계정이 없습니다." />;
  }

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
          {accountList.map((account) => (
            <tr key={account.id} className="hover:bg-gray-100">
              <td>
                <Link href={`/admin/account/${account.id}`}>
                  {account.name}
                </Link>
              </td>
              <td colSpan={2}>
                <Link href={`/admin/account/${account.id}`}>
                  {account.email}
                </Link>
              </td>
              <td>
                <Link href={`/admin/account/${account.id}`}>
                  {AccountTypeLabels[account.type]}
                </Link>
              </td>
              <td>
                <Link href={`/admin/account/${account.id}`}>
                  {AccountStatusLabels[account.status]}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
