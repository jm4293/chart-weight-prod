import { Wrapper } from '@/components/wrapper';
import UserMemberModify from './UserMemberModify';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserPatientDetailPage({ params }: IProps) {
  const { id: userId } = await params;

  return (
    <Wrapper.MAIN text="직원 수정">
      <UserMemberModify userId={userId} />
    </Wrapper.MAIN>
  );
}
