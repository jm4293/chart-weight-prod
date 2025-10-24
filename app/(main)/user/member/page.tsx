import { Wrapper } from '@/components/wrapper';
import { UserMember } from './UserMember';

export default async function UserMemberPage() {
  return (
    <Wrapper.MAIN text="관리자">
      <UserMember />
    </Wrapper.MAIN>
  );
}
