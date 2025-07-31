'use client';

import { formatBirthDate } from '@/utils/birth-format';

interface IProps {
  id: string;
}

function Loading() {
  return <p className="text-2xl text-gray-400">불러오는 중...</p>;
}

export default function PatientInfo(props: IProps) {
  const { id } = props;

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex items-center">
        <p className="min-w-[140px] text text-3xl">이름:</p>
        {/* {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <strong className="text-4xl">{data.patient.name}</strong>
        ) : (
          '이름 없음'
        )} */}
      </div>

      <div className="flex items-center">
        <p className="min-w-[140px] text-3xl">생년월일:</p>
        {/* {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <strong className="text-4xl">
            {formatBirthDate(data.patient.birth)}
          </strong>
        ) : (
          '-'
        )} */}
      </div>

      <div className="flex items-center">
        <p className="min-w-[140px] text-3xl">등록번호:</p>
        {/* {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <strong className="text-4xl">{data.patient.register_num}</strong>
        ) : (
          '-'
        )} */}
      </div>
    </div>
  );
}
