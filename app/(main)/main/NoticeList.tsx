'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { INoticeModel, useNoticeList } from '@/services/notice';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function NoticeList() {
  const router = useRouter();

  const { data, isLoading, isSuccess } = useNoticeList({ page: 1 });

  const handleRowClick = (noticeId: number) => {};

  const formatDate = (dateString: Date) => {
    const formattedDate = dayjs(dateString).format('YY.MM.DD');
    const formattedTime = dayjs(dateString).format('HH:mm');

    return (
      <div className="flex flex-col items-center">
        <Text.PARAGRAPH text={formattedDate} />
        <Text.PARAGRAPH text={formattedTime} />
      </div>
    );
  };

  if (isLoading) {
    return (
      <Wrapper.SECTION>
        <Text.PARAGRAPH text="로딩 중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION>
        <Text.PARAGRAPH text="공지사항을 불러올 수 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th>
            <Text.PARAGRAPH text="번호" />
          </th>
          <th colSpan={3}>
            <Text.PARAGRAPH text="제목" />
          </th>
          <th>
            <Text.PARAGRAPH text="등록일" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.data.length > 0 ? (
          data.data.map((item: INoticeModel) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50"
              onClick={() => handleRowClick(item.id)}>
              <td>
                <Text.PARAGRAPH text={item.id} />
              </td>
              <td colSpan={3}>
                <Text.PARAGRAPH text={item.title} />
              </td>
              <td>{formatDate(item.createdAt)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>
              <Text.PARAGRAPH text="공지사항이 없습니다." />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
