import { Text } from '@/components/text';
import AuthHandler from './AuthHandler';

export default function AuthPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Text.TITLE text="계정 확인" />
      <AuthHandler />
    </div>
  );
}
