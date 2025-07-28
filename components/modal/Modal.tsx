'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '@/hooks/modal';

const Modal = () => {
  const modalRoot = useRef<Element | null>(null);

  const { modal, closeModal } = useModal();

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }

    closeModal();
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }

    closeModal();
  };

  useEffect(() => {
    modalRoot.current = document.getElementById('modal-root');
  }, []);

  if (!modal.visible || !modalRoot.current) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 w-screen h-screen bg-black/40 flex items-center justify-center z-[1000]"
      onClick={closeModal}>
      <div
        className="bg-white rounded-2xl shadow-lg p-6 min-w-[300px] max-w-[1024px] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="text-2xl font-bold mb-4">{modal.title}</div>

        <div className="text-lg mb-6 whitespace-pre-wrap">{modal.content}</div>

        <div className="flex justify-center gap-4">
          {!!modal.onCancel && (
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={handleCancel}>
              {modal.cancelText || '취소'}
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleConfirm}>
            {modal.confirmText || '확인'}
          </button>
        </div>
      </div>
    </div>,
    modalRoot.current,
  );
};

export default Modal;
