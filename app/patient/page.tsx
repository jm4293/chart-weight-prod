import PatientList from '@/app/patient/PatientList';
import { Text } from '@/components/text';
import { getPatientList } from '@/services/patient';

export default async function PatientPage() {
  const patientList = await getPatientList();

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="환자 명단" />
      <PatientList patientList={patientList} />
    </div>
  );
}
