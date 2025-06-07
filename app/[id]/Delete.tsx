"use client";

import { useTransition } from "react";
import { deleteWeight } from "./actions";
import { useRouter } from "next/navigation";

export default function Delete({ weightId }: { weightId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      startTransition(async () => {
        await deleteWeight(weightId);

        router.refresh();
      });
    }
  };

  return (
    <p className="text-red-500 hover:underline disabled:opacity-50" onClick={handleDelete}>
      {isPending ? "삭제 중..." : "삭제"}
    </p>
  );
}
