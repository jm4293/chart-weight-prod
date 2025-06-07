"use client";

import HomeButton from "@/components/button/HomeButton";
import { loginAction } from "./action";
import { useState, useTransition } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result && result.message) {
        setMessage(result.message);
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">패스워드 입력</h1>
      <p className="text-gray-600 mb-4">관리자 페이지에 접근하려면 패스워드를 입력해주세요.</p>

      <form action={handleAction} method="post" className="w-full flex flex-col items-center">
        <input
          type="password"
          name="password"
          placeholder="패스워드"
          className="w-full mb-4 border border-gray-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors mb-4"
          disabled={isPending}
        >
          로그인
        </button>

        {message && <p className="text-red-500 mt-2">{message}</p>}

        <HomeButton />
      </form>
    </div>
  );
}
