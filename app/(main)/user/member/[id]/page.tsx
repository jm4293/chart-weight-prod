import { Wrapper } from '@/components/wrapper';
import UserMemberDetail from './UserMemberDetail';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserMemberDetailPage({ params }: IProps) {
  const { id: userId } = await params;

  return (
    <Wrapper.MAIN text="직원 상세">
      <UserMemberDetail userId={userId} />
    </Wrapper.MAIN>
  );
}
