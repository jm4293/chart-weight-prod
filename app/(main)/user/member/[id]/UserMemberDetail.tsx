'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useUserInfo, useUserMutation } from '@/services/user';
import {
  UserEmailType,
  UserStatusLabels,
  UserTypeLabels,
} from '@/shared/enum/user';
import dayjs from 'dayjs';
import Link from 'next/link';

interface IProps {
  userId: string;
}

export default function UserMemberDetail(props: IProps) {
  const { userId } = props;

  const { data, isLoading, isSuccess } = useUserInfo(userId);

  const { deleteUser } = useUserMutation();

  const handleDelete = () => {
    if (deleteUser.isPending) {
      return;
    }

    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteUser.mutate({ userId: Number(userId), userUuid: data!.uuid });
    }
  };

  if (isLoading) {
    return (
      <Wrapper.SECTION text="직원 상세">
        <Text.PARAGRAPH text="로딩 중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION text="직원 상세">
        <Text.PARAGRAPH text="직원 정보를 불러올 수 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION text="직원 상세">
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
        <Text.HEADING text={UserStatusLabels[data.status]} />
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="가입일:" />
        <Text.HEADING text={dayjs(data.createdAt).format('YYYY-MM-DD HH:mm')} />
      </div>

      <div className="flex justify-end items-center gap-4">
        <div className="cursor-pointer" onClick={handleDelete}>
          <Text.PARAGRAPH text="삭제하기" className="text-red-500" />
        </div>
        <Link className="text-end" href={`/user/member/${userId}/modify`}>
          <Text.PARAGRAPH text="수정하기" className="text-blue-500" />
        </Link>
      </div>
    </Wrapper.SECTION>
  );
}
