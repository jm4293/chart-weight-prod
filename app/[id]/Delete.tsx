"use client";

import { useTransition } from "react";
import { deleteWeight } from "./actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/modal";
import { IWeightModel } from "@/type/model/weight";

export default function Delete({ weight }: { weight: IWeightModel }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { openModal } = useModal();

  const handleDelete = () => {
    openModal({
      content: `${weight.weight}kg 기록을 삭제하시겠습니까?`,
      onConfirm: () => {
        startTransition(async () => {
          await deleteWeight(weight.id);
          router.refresh();
        });
      },
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
