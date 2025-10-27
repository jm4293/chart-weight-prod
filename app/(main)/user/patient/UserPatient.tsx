'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { usePatientList } from '@/services/user';
import { UserStatusLabels } from '@/shared/enum/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserPatient() {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess } = usePatientList({ page });

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
    router.push(`/user/patient/${userId}`);
  };

  if (isLoading) {
    return (
      <Wrapper.SECTION text="환자 리스트">
        <Text.PARAGRAPH text="로딩 중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION text="환자 리스트">
        <Text.PARAGRAPH text="환자 정보를 불러올 수 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION text="환자 리스트">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>
              <Text.PARAGRAPH text="성함" />
            </th>
            <th>
              <Text.PARAGRAPH text="생년월일" />
            </th>
            <th>
              <Text.PARAGRAPH text="등록번호" />
            </th>
            <th>
              <Text.PARAGRAPH text="상태" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-gray-50"
                onClick={() => handleRowClick(patient.id)}>
                <td>
                  <Text.PARAGRAPH text={patient.name} />
                </td>
                <td>
                  <Text.PARAGRAPH text={patient?.birth || '미등록'} />
                </td>
                <td>
                  <Text.PARAGRAPH text={patient?.registerNumber || '미등록'} />
                </td>
                <td>
                  <Text.PARAGRAPH text={UserStatusLabels[patient.status]} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>
                <Text.PARAGRAPH text="환자가 없습니다." />
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
