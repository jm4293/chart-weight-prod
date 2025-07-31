import { Text } from '@/components/text';
import AccountList from './AccountList';

export default function AdminAccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 계정 리스트" />
      <AccountList />
    </div>
  );
}
