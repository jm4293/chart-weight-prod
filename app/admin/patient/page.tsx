import Link from 'next/link';
import AdminPatientList from './AdminPatientList';
import { Text } from '@/components/text';
import { Button } from '@/components/button';

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 환자 리스트" />

      <AdminPatientList />

      <Link href="/admin/patient/register">
        <Button.BLUE text="환자 등록" />
      </Link>
    </div>
  );
}
