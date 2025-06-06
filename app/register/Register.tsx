"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./action";

export default function Register() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    const result = await registerUser(formData);
    if (result.success) {
      router.push("/");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <form
      action={(formData) => {
        startTransition(() => handleAction(formData));
      }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-2xl font-bold mb-4">등록</h1>
      <input
        type="text"
        name="name"
        placeholder="이름"
        className="mb-4 p-2 border border-gray-300 rounded w-80"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="나이"
        className="mb-4 p-2 border border-gray-300 rounded w-80"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-80 hover:bg-blue-600 transition-colors"
        disabled={isPending}
      >
        {isPending ? "등록 중..." : "등록하기"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
}
