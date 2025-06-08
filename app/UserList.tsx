"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "./action";

const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

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

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("사용자 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = (userId: number) => {
    router.push(`/${userId}`);
  };

  const filteredUsers = selectedConsonant
    ? users.filter((user) => getInitialConsonant(user.name) === selectedConsonant)
    : users;

  return (
    <div className="flex flex-col items-center">
      <strong className="text-4xl mb-4">환자 명단</strong>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        <button
          className={`px-4 rounded border ${
            selectedConsonant === null ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => setSelectedConsonant(null)}
        >
          전체
        </button>
        {consonants.map((c) => (
          <button
            key={c}
            className={`px-4 rounded border ${
              selectedConsonant === c ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
            onClick={() => setSelectedConsonant(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 p-4">불러오는 중...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-400 p-4">사용자가 없습니다.</p>
      ) : (
        <ul className="mb-16 h-[60vh] overflow-y-auto border rounded">
          {filteredUsers.map((user) => {
            return (
              <li key={user.id} onClick={() => handleClick(user.id)}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <strong className="text-2xl">{user.name}</strong>
                    <span>|</span>
                    <span>{user?.birth || "-"}</span>
                    <span>|</span>
                    <span>{user?.register || "-"}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
