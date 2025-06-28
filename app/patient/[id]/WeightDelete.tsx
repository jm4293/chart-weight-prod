"use client";

import { useTransition } from "react";
import { deleteWeight } from "./actions";
import { useModal } from "@/hook/modal";
import { IWeightModel } from "@/type/model/weight";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  patient_id: string;
  weight: IWeightModel;
}

export default function WeightDelete(props: IProps) {
  const { patient_id: id, weight } = props;

  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    openModal({
      content: weight.weight
        ? `${weight.weight}kg 기록을 삭제하시겠습니까?`
        : `사진 기록을 삭제하시겠습니까?`,
      onConfirm: () => {
        closeModal();
        startTransition(async () => {
          await deleteWeight(weight.id);
          await queryClient.invalidateQueries({ queryKey: ["patient", id] });
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return (
    <button
      className="text-red-500 hover:underline disabled:opacity-50"
      onClick={handleDelete}
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
