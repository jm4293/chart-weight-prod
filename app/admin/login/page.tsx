import { Text } from '@/components/text';
import AdminLogin from './AdminLogin';

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Text.TITLE text="관리자 로그인" />
      <AdminLogin />
    </div>
  );
}
