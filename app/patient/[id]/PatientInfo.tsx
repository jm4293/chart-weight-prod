"use client";

import { formatBirthDate } from "@/util/birth-format";
import { usePatient } from "@/hook/patient";

interface IProps {
  id: string;
}

function Loading() {
  return <p className="text-2xl text-gray-400">불러오는 중...</p>;
}

export default function PatientInfo(props: IProps) {
  const { id } = props;

  const { data, isLoading, isSuccess, isError } = usePatient({ id });

  if (isError) {
    return (
      <p className="text-red-500 p-4">
        사용자 정보를 불러오는 데 실패했습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex">
        <p className="min-w-[140px] text text-3xl">이름:</p>
        {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <strong className="text-4xl">{data.patient.name}</strong>
        ) : (
          "이름 없음"
        )}
      </div>

      <div className="flex">
        <p className="min-w-[140px] text-3xl">생년월일:</p>
        {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <strong className="text-4xl">
            {formatBirthDate(data.patient.birth)}
          </strong>
        ) : (
          "-"
        )}
      </div>

      <div className="flex">
        <p className="min-w-[140px] text-3xl">등록번호:</p>
        {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <strong className="text-4xl">{data.patient.register_num}</strong>
        ) : (
          "-"
        )}
      </div>
    </div>
  );
}
