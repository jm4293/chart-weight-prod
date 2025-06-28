"use client";

import { useRouter } from "next/navigation";
import { formatBirthDate } from "@/util/birth-format";
import { useState } from "react";
import Consonant from "@/app/patient/Consonant";
import { IPatientModel } from "@/type/model/patient";
import { usePatientList } from "@/hook/patient";

// 한글 초성 추출 함수
function getInitialConsonant(str: string) {
  const cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  if (!str || str.length === 0) {
    return "";
  }

  const code = str.charCodeAt(0) - 0xac00;

  if (code < 0 || code > 11171) {
    return str[0];
  }

  return cho[Math.floor(code / 588)];
}

export default function PatientList() {
  const router = useRouter();

  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(
    null,
  );

  const { data, isLoading, isSuccess } = usePatientList();

  const handleClick = (id: number) => {
    router.push(`/patient/${id}`);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <strong className="text-4xl">환자 명단</strong>

        <Consonant {...{ selectedConsonant, setSelectedConsonant }} />
      </div>

      {isLoading ? (
        <p className="text-gray-500 p-4">불러오는 중...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>생년월일</th>
              <th>등록번호</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess && data.patients.length > 0 ? (
              data.patients
                .filter((user: IPatientModel) => {
                  const initial = getInitialConsonant(user.name);

                  return (
                    selectedConsonant === null || initial === selectedConsonant
                  );
                })
                .map((user: IPatientModel) => (
                  <tr
                    key={user.id}
                    onClick={() => handleClick(user.id)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td>{user.name}</td>
                    <td>{formatBirthDate(user?.birth)}</td>
                    <td>{user?.register_num || "-"}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={3}>사용자가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
