import { Text } from '@/components/text';
import AccountList from './AccountList';
import { getAccountList } from '@/services/account';

export default async function AdminAccountPage() {
  const accounts = await getAccountList();

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 계정 리스트" />
      <AccountList accounts={accounts} />
    </div>
  );
}
