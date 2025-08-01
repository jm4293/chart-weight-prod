import Login from '@/app/login/Login';
import { Text } from '@/components/text';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="로그인" />
      <Login />
    </div>
  );
}
