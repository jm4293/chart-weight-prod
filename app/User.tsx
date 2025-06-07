"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "./action";
import dayjs from "dayjs";

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
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">사용자 리스트</h1>
      <div className="w-full mb-4 h-96 overflow-y-auto border rounded">
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
                className={`px-4 py-2 border-b cursor-pointer hover:bg-blue-100 ${
                  selected === user.id ? "bg-blue-200" : ""
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-2">
                    <strong className="text-xl">{user.name}</strong>
                    <span>{user.age}세</span>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      등록일{" "}
                      {dayjs(user.created_at.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })).format(
                        "YY.MM.DD HH:mm"
                      )}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
