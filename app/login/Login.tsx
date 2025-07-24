"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/common/api";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        json: { email, password },
      }),
  });

  const handleSubmit = (e: React.FormEvent, redirectPath: string) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setErrorMessage("");
    mutate(undefined, {
      onSuccess: () => {
        router.push(redirectPath);
      },
      onError: (err) => {
        setErrorMessage(err.message);
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="아이디"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e, "/patient");
        }}
        required
      />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <div className="flex flex-col gap-8">
        <button
          className="bg-blue-500 text-white p-4 rounded disabled:opacity-50"
          onClick={(e) => handleSubmit(e, "/patient")}
          disabled={isPending}
        >
          <p className="text-2xl">로그인</p>
        </button>
        {/* <button
          className="bg-red-500 text-white p-4 rounded disabled:opacity-50"
          onClick={(e) => handleSubmit(e, "/admin")}
          disabled={isPending}
        >
          <p className="text-2xl">관리 페이지 로그인</p>
        </button> */}
      </div>
    </div>
  );
}
