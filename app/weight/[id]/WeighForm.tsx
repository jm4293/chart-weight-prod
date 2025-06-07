"use client";

import { useTransition } from "react";
import { addWeight } from "./actions";
import { useRouter } from "next/navigation";

export default function WeightForm({ userId }: { userId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    const weight = Number(formData.get("weight"));
    await addWeight(userId, weight);
    router.refresh(); // 새로고침해서 최신 데이터 반영
  };

  return (
    <form
      action={(formData) => {
        startTransition(() => handleAction(formData));
      }}
      className="w-full mb-8 flex gap-2"
    >
      <input
        type="number"
        name="weight"
        placeholder="몸무게(kg)"
        className="w-full p-2 border rounded"
        required
        step="any"
      />{" "}
      <button type="submit" className="bg-blue-500 text-white px-4 rounded text-nowrap" disabled={isPending}>
        {isPending ? "등록 중..." : "등록"}
      </button>
    </form>
  );
}
