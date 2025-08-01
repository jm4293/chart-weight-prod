import { LinkButton } from '@/components/button';
import { Text } from '@/components/text';
import { getPatient } from '@/services/patient';
import { formatBirthDate } from '@/utils';
import AdminDeletePatient from './DeletePatient';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPatientDetailPage(props: IProps) {
  const { params } = props;
  const { id } = await params;

  const patient = await getPatient(id);

  if (!patient) {
    return (
      <div className="flex flex-col gap-8">
        <Text.TITLE text="관리자 - 환자 상세" />
        <Text.HEADING text="환자를 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 환자 상세" />

      <div className="flex flex-col gap-2">
        <Text.HEADING text={`환자명: ${patient.name}`} />
        <Text.HEADING text={`생년월일: ${formatBirthDate(patient.birth)}`} />
        <Text.HEADING text={`등록번호: ${patient.register}`} />
        <Text.HEADING
          text={`계정 생성일: ${new Date(patient.created_at).toLocaleDateString()}`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <AdminDeletePatient patient={patient} />
        <LinkButton.BLUE
          text="환자 수정"
          href={`/admin/patient/${id}/modify`}
        />
        <LinkButton.GRAY text="환자 목록" href="/admin/patient" />
      </div>
    </div>
  );
}
