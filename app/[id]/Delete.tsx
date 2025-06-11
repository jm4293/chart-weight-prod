"use client";

import { useTransition } from "react";
import { deleteWeight } from "./actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/modal";

export default function Delete({ weight }: { weight: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { openModal } = useModal();

  const handleDelete = () => {
    openModal(`${weight.weight}kg 기록을 삭제하시겠습니까?`, () => {
      startTransition(async () => {
        await deleteWeight(weight.id);
        router.push("/");
      });
    });
  };

  return (
    <p
      className="text-red-500 hover:underline disabled:opacity-50"
      onClick={handleDelete}
    >
      {isPending ? "삭제 중..." : "삭제"}
    </p>
  );
}
