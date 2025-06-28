"use client";

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { registerWeight } from "@/app/patient/[id]/actions";
import { useModal } from "@/hook/modal";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface INumberPadModalProps {
  id: string;
  setOpenNumberPadModal: Dispatch<SetStateAction<boolean>>;
}

export default function NumberPadModal(props: INumberPadModalProps) {
  const { id, setOpenNumberPadModal } = props;

  const router = useRouter();
  const queryClient = useQueryClient();

  const [weight, setWeight] = useState("");

  const [isPending, startTransition] = useTransition();

  const { openModal, closeModal } = useModal();

  const handleClick = (val: string) => {
    if (val === "지움") {
      setWeight((prev) => prev.slice(0, -1));
      return;
    }

    if (weight.length === 0 && val === ".") {
      return;
    }

    if (weight.length === 0 && val === "0") {
      return;
    }

    if (val === "." && weight.includes(".")) {
      return;
    }

    setWeight((prev) => prev + val);
  };

  const handleAction = async () => {
    if (weight === "") {
      openModal({
        content: "체중을 입력해주세요",
        onConfirm: () => {
          closeModal();
        },
        disableClose: true,
      });
      return;
    }

    openModal({
      content: `입력하신 체중이 ${weight}kg 맞습니까?`,
      confirmText: "등록",
      onConfirm: () => {
        closeModal();

        startTransition(async () => {
          await registerWeight(Number(id), weight);
          await queryClient.invalidateQueries({ queryKey: ["patient", id] });

          router.push("/patient");
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleConfirm = async () => {
    await handleAction();
  };

  const handleCancel = () => {
    setOpenNumberPadModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
      <div className="max-w-[1024px] w-[90vw] h-[80vh] bg-white rounded-2xl shadow-lg flex flex-col items-center p-8 gap-8 overflow-x-hidden overflow-y-auto">
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl">등록 중...</span>
          </div>
        ) : (
          <>
            <div className="text-4xl text-center whitespace-nowrap">
              {weight ? `${weight}kg` : "몸무게를 입력하세요"}
            </div>

            <div className="w-5/6 h-5/6 grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "지움"].map((num) => (
                <button
                  key={num}
                  className={`border rounded`}
                  onClick={() => handleClick(num.toString())}
                >
                  <p
                    className={`w-full text-4xl ${num === "지움" ? "text-red-500" : ""}`}
                  >
                    {num}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                className="px-10 py-4 bg-gray-300 text-4xl text-black rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                className="px-10 py-4 bg-blue-500 text-4xl text-white rounded hover:bg-blue-600"
                onClick={handleConfirm}
              >
                등록
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
