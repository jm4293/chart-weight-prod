"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./action";
import Link from "next/link";

export default function Register() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    if (confirm("환자를 등록하시겠습니까?")) {
      const result = await registerUser(formData);
      if (result.success) {
        router.push("/admin/user");
      } else {
        setMessage(result.message);
      }
    }
  };

  return (
    <form
      action={(formData) => {
        startTransition(() => handleAction(formData));
      }}
      className="flex flex-col items-center h-screen"
    >
      <h1 className="text-2xl font-bold my-8">관리자페이지 - 환자 등록</h1>

      <input type="text" name="name" placeholder="이름" className="w-full mb-4 border border-gray-300" required />
      <input
        type="number"
        name="birth"
        placeholder="생년월일"
        className="w-full mb-4 border border-gray-300"
        required
      />
      <input
        type="text"
        name="register"
        placeholder="등록번호"
        className="w-full mb-8 border border-gray-300 "
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors mb-4"
        disabled={isPending}
      >
        {isPending ? "등록 중..." : "등록하기"}
      </button>
      {message && <p className="mt-4">{message}</p>}

      <Link
        href="/admin/user"
        className="w-full bg-gray-500 text-white p-4 rounded hover:bg-gray-600 transition-colors text-center"
      >
        관리자페이지로 돌아가기
      </Link>
    </form>
  );
}
