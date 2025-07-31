import { Text } from '@/components/text';
import AdminSignup from './AdminSignup';

export default function AdminSignupPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 회원가입" />
      <AdminSignup />
    </div>
  );
}
