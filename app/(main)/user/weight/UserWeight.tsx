'use client';

import { Wrapper } from '@/components/wrapper';
import { useWeightList } from '@/services/weight';
import dayjs from 'dayjs';
import { useState } from 'react';

interface WeightData {
  id: number;
  weight: number | null;
  createdAt: string;
  imageUrl: string;
  userId: number;
  uuid: string;
  updatedAt: string | null;
}

export function UserWeight() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const weightList = useWeightList({ page });

  const formatDate = (dateString: string) => {
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

  const totalItems = weightList.data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = weightList.data?.data || [];

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, totalItems);

  // 페이지네이션에 표시할 페이지 번호들 계산
  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // 총 페이지가 5개 이하면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 앞뒤 2개씩 표시
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, page + 2);

      // 시작 페이지가 1이면 끝 페이지를 더 늘림
      if (startPage === 1) {
        endPage = Math.min(totalPages, 5);
      }
      // 끝 페이지가 마지막이면 시작 페이지를 더 줄임
      if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Wrapper.SECTION text="등록된 기록">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                체중
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                이미지
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                등록일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item: WeightData) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <span
                    className={`font-medium ${item.weight ? 'text-blue-600' : 'text-gray-400'}`}>
                    {formatWeight(item.weight)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
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
                    <span className="text-gray-400">이미지 없음</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {formatDate(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 데이터가 없을 때 */}
        {(!currentItems || currentItems.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            등록된 체중 기록이 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          {/* 모바일 뷰 */}
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              이전
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                {page} / {totalPages}
              </span>
            </div>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              다음
            </button>
          </div>

          {/* 데스크톱 뷰 */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                전체 <span className="font-medium">{totalItems}</span>개 중{' '}
                <span className="font-medium">{startIndex}</span>-
                <span className="font-medium">{endIndex}</span>개 표시
              </p>
            </div>

            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination">
                {/* 이전 버튼 */}
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="sr-only">이전</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* 첫 페이지 */}
                {visiblePages[0] > 1 && (
                  <>
                    <button
                      onClick={() => handlePageClick(1)}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      1
                    </button>
                    {visiblePages[0] > 2 && (
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                    )}
                  </>
                )}

                {/* 현재 페이지 주변 페이지들 */}
                {visiblePages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === pageNumber
                        ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}>
                    {pageNumber}
                  </button>
                ))}

                {/* 마지막 페이지 */}
                {visiblePages[visiblePages.length - 1] < totalPages && (
                  <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => handlePageClick(totalPages)}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      {totalPages}
                    </button>
                  </>
                )}

                {/* 다음 버튼 */}
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="sr-only">다음</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </Wrapper.SECTION>
  );
}
