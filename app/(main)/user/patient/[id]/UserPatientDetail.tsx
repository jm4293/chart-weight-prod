'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useUser } from '@/services/user';
import {
  UserEmailType,
  UserStatusLabels,
  UserTypeLabels,
} from '@/shared/enum/user';
import dayjs from 'dayjs';
import Link from 'next/link';

interface IProps {
  id: string;
}

export default function UserPatientDetail(props: IProps) {
  const { id } = props;

  const { data, isLoading, isSuccess } = useUser({ id });

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
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="이름:" />
        <Text.HEADING text={data.name} />
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="생년월일:" />
        <Text.HEADING text={data.birth || '미등록'} />
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="등록번호:" />
        <Text.HEADING text={data.registerNumber || '미등록'} />
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
        <div className="cursor-pointer">
          <Text.PARAGRAPH text="삭제하기" className="text-red-500" />
        </div>
        <Link className="text-end" href={`/user/patient/${id}/modify`}>
          <Text.PARAGRAPH text="수정하기" className="text-blue-500" />
        </Link>
      </div>
    </Wrapper.SECTION>
  );
}
