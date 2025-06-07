"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "../../action";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";
import Delete from "./[id]/Delete";
import Link from "next/link";
import HomeButton from "@/components/button/HomeButton";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export default function Page() {
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
    router.push(`/admin/user/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <strong className="text-2xl mb-4">관리페이지 - 환자 명단</strong>

      {loading ? (
        <p className="text-gray-400 p-4">불러오는 중...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400 p-4">사용자가 없습니다.</p>
      ) : (
        <ul className="h-[60vh] overflow-y-auto border rounded">
          {users.map((user) => {
            return (
              <li key={user.id} onClick={() => handleClick(user.id)} className="flex justify-between items-center">
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

      <Link
        href="/admin/user/register"
        className="mt-4 w-full bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors text-center"
      >
        환자 등록
      </Link>
      <HomeButton />
    </div>
  );
}
