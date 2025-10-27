'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useMemberList } from '@/services/user';
import { UserStatusLabels, UserTypeLabels } from '@/shared/enum/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserMember() {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess } = useMemberList({ page });

  const itemsPerPage = 10;
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleRowClick = (userId: number) => {
    router.push(`/user/member/${userId}`);
  };

  if (isLoading) {
    return (
      <Wrapper.SECTION text="직원 리스트">
        <Text.PARAGRAPH text="로딩 중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION text="직원 리스트">
        <Text.PARAGRAPH text="직원 정보를 불러올 수 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION text="직원 리스트">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>
              <Text.PARAGRAPH text="성함" />
            </th>
            <th>
              <Text.PARAGRAPH text="타입" />
            </th>
            <th>
              <Text.PARAGRAPH text="상태" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50"
                onClick={() => handleRowClick(member.id)}>
                <td>
                  <Text.PARAGRAPH text={member.name} />
                </td>
                <td>
                  <Text.PARAGRAPH text={UserTypeLabels[member.type]} />
                </td>
                <td>
                  <Text.PARAGRAPH text={UserStatusLabels[member.status]} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>
                <Text.PARAGRAPH text="직원이 없습니다." />
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
