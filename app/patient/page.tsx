import PatientList from '@/app/patient/PatientList';
import { Text } from '@/components/text';

export default function PatientPage() {
  return (
    <div>
      <Text.TITLE text="환자 명단" />
      <PatientList />
    </div>
  );
}
