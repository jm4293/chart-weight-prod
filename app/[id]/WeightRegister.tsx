"use client";

import { useState } from "react";

import NumberPadModal from "@/app/[id]/NumberPadModal";

export default function WeightRegister({ userId }: { userId: number }) {
  const [openNumberPadModal, setOpenNumberPadModal] = useState(false);

  return (
    <>
      {openNumberPadModal && (
        <NumberPadModal
          userId={userId}
          setOpenNumberPadModal={setOpenNumberPadModal}
        />
      )}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-4xl text-white rounded py-4"
          onClick={() => setOpenNumberPadModal(true)}
        >
          몸무게 등록하기
        </button>
      </div>
    </>
  );
}
