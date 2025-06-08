"use client";

import { useTransition } from "react";
import { addWeight } from "./actions";
import { useRouter } from "next/navigation";

export default function WeightRegister({ userId }: { userId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    const weight = Number(formData.get("weight"));

    if (isNaN(weight) || weight <= 0) {
      alert("올바른 몸무게를 입력해주세요.");
      return;
    }

    if (confirm(`입력하신 체중이 ${weight}kg 맞습니까?`)) {
      await addWeight(userId, weight);
      // router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">몸무게 등록</h1>

      <form
        action={(formData) => {
          startTransition(() => handleAction(formData));
        }}
        className="w-full flex flex-col gap-4"
      >
        <input type="number" name="weight" placeholder="몸무게(kg)" className="w-full border" required step="any" />{" "}
        <button type="submit" className="bg-blue-500 text-white rounded" disabled={isPending}>
          {isPending ? "등록 중..." : "등록하기"}
        </button>
      </form>
    </div>
  );
}
