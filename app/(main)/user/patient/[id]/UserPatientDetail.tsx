'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useUserInfo, useUserMutation } from '@/services/user';
import { useWeightMutation } from '@/services/weight';
import {
  UserEmailType,
  UserStatusLabels,
  UserTypeLabels,
} from '@/shared/enum/user';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import Link from 'next/link';

interface IProps {
  userId: string;
}

export default function UserPatientDetail(props: IProps) {
  const { userId } = props;

  const { data, isLoading, isSuccess } = useUserInfo(userId);

  const { deleteWeight } = useWeightMutation();
  const { deleteUser } = useUserMutation();

  const formatDate = (dateString: Date) => {
    const formattedDate = dayjs(dateString).format('YY.MM.DD');
    const formattedTime = dayjs(dateString).format('HH:mm');

    return (
      <div className="flex flex-col items-center">
        {formattedDate} <br /> {formattedTime}
      </div>
    );
  };

  const formatWeight = (weight: number | null) => {
    return weight ? `${weight}kg` : '미등록';
  };

  const handleWeightDelete = (weightId: number) => {
    if (deleteWeight.isPending) {
      return;
    }

    if (confirm('삭제하시겠습니까?')) {
      deleteWeight.mutate(weightId);
    }
  };

  const handlePatientDelete = () => {
    if (deleteUser.isPending) {
      return;
    }

    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteUser.mutate({ userId: Number(userId), userUuid: data!.uuid });
    }
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
    <>
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
          <Text.HEADING
            text={dayjs(data.createdAt).format('YYYY-MM-DD HH:mm')}
          />
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <div className="flex justify-end items-center gap-4">
          <div className="cursor-pointer" onClick={handlePatientDelete}>
            <Text.PARAGRAPH text="삭제하기" className="text-red-500" />
          </div>
          <Link className="text-end" href={`/user/patient/${userId}/modify`}>
            <Text.PARAGRAPH text="수정하기" className="text-blue-500" />
          </Link>
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION text="환자 체중 기록">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th>
                <Text.PARAGRAPH text="체중" />
              </th>
              <th>
                <Text.PARAGRAPH text="이미지" />
              </th>
              <th>
                <Text.PARAGRAPH text="등록일" />
              </th>
              <th>
                <Text.PARAGRAPH text="삭제" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.weight.length > 0 ? (
              data.weight.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td>
                    <Text.PARAGRAPH text={formatWeight(item.weight)} />
                  </td>
                  <td>
                    {item.imageUrl ? (
                      <div className="flex justify-center">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.imageUrl}`}
                          alt="체중 측정 이미지"
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                          onClick={() =>
                            window.open(
                              `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.imageUrl}`,
                              '_blank',
                            )
                          }
                        />
                      </div>
                    ) : (
                      <Text.PARAGRAPH text="이미지 없음" />
                    )}
                  </td>
                  <td>
                    <Text.PARAGRAPH text={formatDate(item.createdAt)} />
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <Trash onClick={() => handleWeightDelete(item.id)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <Text.PARAGRAPH text="등록된 체중 기록이 없습니다." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Wrapper.SECTION>
    </>
  );
}
