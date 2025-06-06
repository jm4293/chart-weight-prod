"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "./action";

export default function User() {
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleClick = (userId: number) => {
    setSelected(userId);
    router.push(`/weight/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">사용자 정보</h1>
      <div className="mb-4 w-80 h-96 overflow-y-auto border rounded">
        {users.length === 0 && <p className="text-gray-400 p-4">사용자가 없습니다.</p>}
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleClick(user.id)}
              className={`p-2 cursor-pointer hover:bg-blue-100 ${selected === user.id ? "bg-blue-200" : ""}`}
            >
              {user.name} ({user.age})
            </li>
          ))}
        </ul>
      </div>
      {/* {selected && (
        <div className="mt-4">
          <span className="font-bold">선택된 사용자 ID:</span> {selected}
        </div>
      )} */}
    </div>
  );
}
