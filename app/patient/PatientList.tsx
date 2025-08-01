'use client';

import { formatBirthDate } from '@/utils/birth-format';
import { useState } from 'react';
import Consonant from '@/app/patient/Consonant';
import { IPatientEntity } from '@/services/patient';
import { Text } from '@/components/text';
import Link from 'next/link';

interface IProps {
  patientList: IPatientEntity[];
}

// 한글 초성 추출 함수
function getInitialConsonant(str: string) {
  const cho = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  if (!str || str.length === 0) {
    return '';
  }

  const code = str.charCodeAt(0) - 0xac00;

  if (code < 0 || code > 11171) {
    return str[0];
  }

  return cho[Math.floor(code / 588)];
}

export default function PatientList(props: IProps) {
  const { patientList } = props;

  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(
    null,
  );

  if (!patientList || patientList.length === 0) {
    return <Text.HEADING text="환자 명단이 없습니다." />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Consonant
        selectedConsonant={selectedConsonant}
        setSelectedConsonant={setSelectedConsonant}
      />

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>생년월일</th>
            <th>등록번호</th>
          </tr>
        </thead>
        <tbody>
          {patientList
            .filter((user) => {
              const initial = getInitialConsonant(user.name);

              return (
                selectedConsonant === null || initial === selectedConsonant
              );
            })
            .map((user) => (
              <Link href={`/patient/${user.id}`} key={user.id}>
                <tr className="hover:bg-gray-100">
                  <td>{user.name}</td>
                  <td>{formatBirthDate(user.birth)}</td>
                  <td>{user.register}</td>
                </tr>
              </Link>
            ))}
        </tbody>
      </table>
    </div>
  );
}
