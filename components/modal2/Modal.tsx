"use client";

import { useAtom } from "jotai";

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { modalAtom } from "@/store/modal-atom";

export default function Modal() {
  const [modal, setModal] = useAtom(modalAtom);
  const modalRoot = useRef<Element | null>(null);

  useEffect(() => {
    modalRoot.current = document.getElementById("modal-root");
  }, []);

  if (!modal.visible || !modalRoot.current) {
    return null;
  }

  const handleConfirm = () => {
    setModal((prev) => ({ ...prev, visible: false }));
    modal.onConfirm?.();
  };

  const handleCancel = () => {
    setModal((prev) => ({ ...prev, visible: false }));
    modal.onCancel?.();
  };

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] flex flex-col items-center">
        <div className="mb-6 text-4xl text-center">{modal.content}</div>

        <div className="flex gap-4">
          <button
            className="p-4 text-4xl bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className="p-4 text-4xl bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    modalRoot.current,
  );
}
