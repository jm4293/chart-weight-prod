'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { INoticeModel, useNoticeList } from '@/services/notice';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Notice() {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess } = useNoticeList({ page });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.total / itemsPerPage);

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

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleRowClick = (noticeId: number) => {
    router.push(`/user/notice/${noticeId}`);
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
    <Wrapper.SECTION>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>
              <Text.PARAGRAPH text="번호" />
            </th>
            <th>
              <Text.PARAGRAPH text="제목" />
            </th>
            <th>
              <Text.PARAGRAPH text="작성자" />
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
                <td>
                  <Text.PARAGRAPH text={item.title} />
                </td>
                <td>
                  <Text.PARAGRAPH text={item.user?.name} />
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

      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <Text.PARAGRAPH text="이전" />
        </button>

        <Text.PARAGRAPH text={`${page} / ${totalPages}`} />

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <Text.PARAGRAPH text="다음" />
        </button>
      </div>
    </Wrapper.SECTION>
  );
}
