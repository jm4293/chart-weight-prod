'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import {
  IWeightModel,
  useWeightList,
  useWeightMutation,
} from '@/services/weight';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Trash } from 'lucide-react';

export default function UserWeight() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess } = useWeightList({ page });

  const { deleteWeight } = useWeightMutation();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.total / itemsPerPage);

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

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = (weightId: number) => {
    if (deleteWeight.isPending) {
      return;
    }

    if (confirm('삭제하시겠습니까?')) {
      deleteWeight.mutate(weightId);
    }
  };

  if (isLoading) {
    return (
      <Wrapper.SECTION text="등록된 기록">
        <Text.PARAGRAPH text="로딩 중..." />
      </Wrapper.SECTION>
    );
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION text="등록된 기록">
        <Text.PARAGRAPH text="체중 기록을 불러올 수 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <Wrapper.SECTION text="등록된 기록">
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
          {data.data.length > 0 ? (
            data.data.map((item: IWeightModel) => (
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
                    <Trash onClick={() => handleDelete(item.id)} />
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
