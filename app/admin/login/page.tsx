import { Text } from '@/components/text';
import AdminLogin from './AdminLogin';
import { LinkButton } from '@/components/button';

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 로그인" />
      <AdminLogin />
      <LinkButton.GRAY href="/login" text="관리자 나가기" />
    </div>
  );
}
