import PatientList from '@/app/patient/PatientList';
import { TitleText } from '@/components/text';

export default function PatientPage() {
  return (
    <div style={{ border: '1px solid red' }}>
      <TitleText text="환자 명단" />
      <PatientList />
    </div>
  );
}
