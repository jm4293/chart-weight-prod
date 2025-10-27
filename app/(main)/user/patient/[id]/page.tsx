import { Wrapper } from '@/components/wrapper';
import UserPatientDetail from './UserPatientDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserPatientDetailPage({ params }: IProps) {
  const { id: userId } = await params;

  return (
    <Wrapper.MAIN text="환자 상세">
      <UserPatientDetail userId={userId} />
    </Wrapper.MAIN>
  );
}
