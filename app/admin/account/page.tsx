import { Text } from '@/components/text';
import AccountList from './AccountList';

export default function AdminAccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="계정 관리 페이지" />
      <AccountList />
    </div>
  );
}
