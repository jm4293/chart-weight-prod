import { Wrapper } from '@/components/wrapper';
import UserPatientModify from './UserPatientModify';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserPatientDetailPage({ params }: IProps) {
  const { id } = await params;

  return (
    <Wrapper.MAIN text="환자 수정">
      <UserPatientModify id={id} />
    </Wrapper.MAIN>
  );
}
