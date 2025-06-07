"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "./action";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleClick = (userId: number) => {
    router.push(`/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <strong className="text-4xl mb-4">환자 명단</strong>

      {loading ? (
        <p className="text-gray-400 p-4">불러오는 중...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400 p-4">사용자가 없습니다.</p>
      ) : (
        <ul className="mb-16 h-[60vh] overflow-y-auto border rounded">
          {users.map((user) => {
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
