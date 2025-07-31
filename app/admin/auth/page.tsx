import { Text } from '@/components/text';
import AdminAuthHandler from './AdminAuthHandler';

export default function AdminAuthPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 계정 확인" />
      <AdminAuthHandler />
    </div>
  );
}
