import { RouterButton } from '@/components/button';
import { Text } from '@/components/text';

export default function AdminDashboardPage() {
  return (
    <div>
      <Text.TITLE text="관리자 대시보드" />

      <div className="w-1/3 flex flex-col gap-4">
        <RouterButton text="계정 관리" routerPath="/admin/account" />
        <RouterButton text="환자 관리" routerPath="/admin/patient" />
      </div>
    </div>
  );
}
