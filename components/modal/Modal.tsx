"use client";

import { useAtomValue } from "jotai";

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { modalAtom } from "@/store/modal-atom";

export default function Modal() {
  const modalRoot = useRef<Element | null>(null);

  const {
    visible,
    content,
    onConfirm,
    confirmText,
    onCancel,
    cancelText,
    disableClose,
  } = useAtomValue(modalAtom);

  const handleCancel = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  useEffect(() => {
    modalRoot.current = document.getElementById("modal-root");
  }, []);

  if (!visible || !modalRoot.current) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[300px] max-w-[1024px] flex flex-col items-center">
        <div className="mt-4 mb-6 text-4xl text-center">{content}</div>

        <div className="flex gap-4">
          {!disableClose && (
            <button
              className="px-10 py-4 text-4xl bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              {cancelText || "취소"}
            </button>
          )}
          <button
            className="px-10 py-4 text-4xl bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            {confirmText || "확인"}
          </button>
        </div>
      </div>
    </div>,
    modalRoot.current,
  );
}
