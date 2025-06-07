"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "./action";

export default function User() {
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false); // 데이터 불러오면 로딩 종료
    });
  }, []);

  const handleClick = (userId: number) => {
    setSelected(userId);
    router.push(`/weight/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">사용자 리스트</h1>
      <div className="mb-4 w-80 h-96 overflow-y-auto border rounded">
        {loading ? (
          <p className="text-gray-400 p-4">불러오는 중...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-400 p-4">사용자가 없습니다.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleClick(user.id)}
                className={`flex items-center gap-2 p-4 border-b cursor-pointer hover:bg-blue-100 ${
                  selected === user.id ? "bg-blue-200" : ""
                }`}
              >
                <strong className="text-xl">{user.name}</strong>
                <span>|</span>
                <span>{user.age}세</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
