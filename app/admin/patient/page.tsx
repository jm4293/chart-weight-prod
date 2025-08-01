import AdminPatientList from './AdminPatientList';
import { Text } from '@/components/text';
import { LinkButton } from '@/components/button';
import { getPatientList } from '@/services/patient';

export default async function AdminPage() {
  const patientList = await getPatientList();

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 환자 리스트" />

      <AdminPatientList patientList={patientList} />

      <div className="flex flex-col gap-4">
        <LinkButton.BLUE text="환자 등록" href="/admin/patient/register" />
        <LinkButton.GRAY text="대시보드" href="/admin/dashboard" />
      </div>
    </div>
  );
}
