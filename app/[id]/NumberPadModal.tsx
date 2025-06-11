"use client";

import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { addWeight } from "@/app/[id]/actions";
import { useModal } from "@/hook/modal";
import { useRouter } from "next/navigation";

interface INumberPadModalProps {
  userId: number;
  setOpenNumberPadModal: Dispatch<SetStateAction<boolean>>;
}

export default function NumberPadModal(props: INumberPadModalProps) {
  const { userId, setOpenNumberPadModal } = props;

  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [isPending, startTransition] = useTransition();

  const { openModal } = useModal();

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
      openModal("체중을 입력해주세요");
      return;
    }

    openModal(
      `입력하신 체중이 ${weight}kg 맞습니까?`,
      () => {
        startTransition(async () => {
          await addWeight(userId, Number(weight));
          router.push("/");
        });
      },
      () => {},
    );
  };

  const handleConfirm = async () => {
    await handleAction();
  };

  const handleCancel = () => {
    setOpenNumberPadModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
      {isPending ? (
        <div className="max-w-[1024px] w-[90vw] h-[80vh] flex items-center justify-center bg-white rounded shadow-lg">
          <span className="text-3xl">등록중...</span>
        </div>
      ) : (
        <div className="max-w-[1024px] w-[90vw] h-[80vh] bg-white rounded shadow-lg flex flex-col items-center p-8 gap-8 overflow-y-auto">
          <div className="text-4xl text-center">
            {weight || "숫자를 입력하세요"}
          </div>

          <div className="w-5/6 h-5/6 grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "지움"].map((num) => (
              <button
                key={num}
                className="border rounded"
                onClick={() => handleClick(num.toString())}
              >
                <p className="w-full text-4xl">{num}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              className="px-10 py-4 bg-gray-300 text-4xl text-black rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              종료
            </button>
            <button
              className="px-10 py-4 bg-blue-500 text-4xl text-white rounded hover:bg-blue-600"
              onClick={handleConfirm}
            >
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
