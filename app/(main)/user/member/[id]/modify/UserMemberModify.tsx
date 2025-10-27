'use client';

import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useUser, useUserMutation } from '@/services/user';
import {
  UserEmailType,
  UserStatus,
  UserStatusLabels,
  UserTypeLabels,
} from '@/shared/enum/user';

interface IProps {
  id: string;
}

export default function UserMemberModify(props: IProps) {
  const { id } = props;

  const { data, isLoading, isSuccess } = useUser({ id });

  const { modifyUser } = useUserMutation();

  const handleModify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    const birth = formData.get('birth');
    const registerNumber = formData.get('registerNumber');
    const status = formData.get('status');

    modifyUser.mutate({
      id: Number(id),
      birth: birth ? String(birth) : null,
      registerNumber: registerNumber ? String(registerNumber) : null,
      status: Number(status),
    });
  };

  if (isLoading) {
    return (
      <Wrapper.SECTION text="환자 상세">
        <Text.PARAGRAPH text="로딩 중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION text="환자 상세">
        <Text.PARAGRAPH text="환자 정보를 불러올 수 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION text="환자 상세">
      <form onSubmit={handleModify} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="이름:" />
          <Text.HEADING text={data.name} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="이메일:" />
          <Text.HEADING text={data.email} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="가입경로:" />
          <Text.HEADING text={UserEmailType[data.emailType]} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="타입:" />
          <Text.HEADING text={UserTypeLabels[data.type]} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="상태:" />
          <select
            name="status"
            defaultValue={data.status}
            className="border border-gray-300 rounded px-2 py-1">
            {Object.values(UserStatus)
              .filter((el) => typeof el === 'number')
              .map((el) => (
                <option key={el} value={el}>
                  {UserStatusLabels[el]}
                </option>
              ))}
          </select>
        </div>

        <Button color="blue" type="submit" text="수정완료" />
      </form>
    </Wrapper.SECTION>
  );
}
