"use client";

import { useState, useRef, useTransition } from "react";
import NumberPadModal from "@/app/patient/[id]/NumberPadModal";
import { addWeightWithImage } from "@/app/patient/[id]/actions";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  id: string;
}

export default function WeightRegister(props: IProps) {
  const { id } = props;

  const router = useRouter();
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [openNumberPadModal, setOpenNumberPadModal] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      startTransition(async () => {
        await addWeightWithImage(Number(id), file);
        await queryClient.invalidateQueries({ queryKey: ["weight", id] });

        router.push("/patient");
        fileInputRef.current!.value = "";
      });
    }
  };

  return (
    <>
      {openNumberPadModal && (
        <NumberPadModal id={id} setOpenNumberPadModal={setOpenNumberPadModal} />
      )}

      <input
        type="file"
        accept="image/*"
        capture
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-4">
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl">등록 중...</span>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="bg-blue-500 text-4xl text-white rounded py-4"
              onClick={handleButtonClick}
            >
              사진으로 등록하기
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-4xl text-white rounded py-4"
              onClick={() => setOpenNumberPadModal(true)}
            >
              입력으로 등록하기
            </button>
          </>
        )}
      </div>
    </>
  );
}
