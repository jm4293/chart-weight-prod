import { Text } from '@/components/text';
import AccountList from './AccountList';
import { getAccountList } from '@/services/account';
import { LinkButton } from '@/components/button';

export default async function AdminAccountPage() {
  const accountList = await getAccountList();

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 계정 리스트" />
      <AccountList accountList={accountList} />
      <LinkButton.GRAY text="대시보드" href="/admin/dashboard" />
    </div>
  );
}
