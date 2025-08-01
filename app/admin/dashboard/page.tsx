import { LinkButton } from '@/components/button';
import { Text } from '@/components/text';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 대시보드" />

      <div className="flex flex-col gap-4">
        <LinkButton.BLUE text="계정 관리" href="/admin/account" />
        <LinkButton.BLUE text="환자 관리" href="/admin/patient" />
      </div>
    </div>
  );
}
