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

  const mutation = useMutation({
    mutationFn: () =>
      api.post("http://localhost:5007/auth/login", {
        json: { email, password },
      }),
    onSuccess: (res) => {
      router.push("/patient");
    },
    onError: (err) => {
      setErrorMessage(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");

    mutation.mutate();
  };

  return (
    <div className="w-full max-w-[1024px] flex flex-col gap-4">
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
          if (e.key === "Enter") handleSubmit(e);
        }}
        required
      />
      <button
        className="bg-blue-500 text-white p-4 rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        <p className="text-2xl">
          {mutation.isPending ? "로그인 중..." : "로그인"}
        </p>
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
}
