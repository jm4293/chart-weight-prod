import { Wrapper } from '@/components/wrapper';
import { UserPatient } from './UserPatient';

export default function UserPatientPage() {
  return (
    <Wrapper.MAIN text="관리자">
      <UserPatient />
    </Wrapper.MAIN>
  );
}
