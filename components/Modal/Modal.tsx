"use client";

import { useAtom } from "jotai";
import { modalAtom } from "./modalAtom";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal() {
  const [modal, setModal] = useAtom(modalAtom);
  const modalRoot = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!modalRoot.current) {
      let el = document.getElementById("modal-root");
      if (!el) {
        el = document.createElement("div");
        el.id = "modal-root";
        document.body.appendChild(el);
      }
      modalRoot.current = el;
    }
  }, []);

  if (!modal.visible || !modalRoot.current) return null;

  const handleConfirm = () => {
    setModal((prev) => ({ ...prev, visible: false }));
    modal.onConfirm?.();
  };
  const handleCancel = () => {
    setModal((prev) => ({ ...prev, visible: false }));
    modal.onCancel?.();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] flex flex-col items-center">
        <div className="mb-6 text-lg text-center">{modal.content}</div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={handleCancel}>
            취소
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>,
    modalRoot.current
  );
}
