'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '@/hooks/modal';
import { Button } from '../button';

export const Modal = () => {
  const modalRoot = useRef<Element | null>(null);

  const { modal, closeModal } = useModal();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (modal.onCancel) {
      modal.onCancel();
    }
  };

  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    if (modal.onConfirm) {
      modal.onConfirm();
    }
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
        className="bg-white rounded-2xl shadow-lg p-6 min-w-[320px] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}>
        <div className="text-2xl font-bold mb-4">{modal.title}</div>

        <div className="text-xl mb-6 whitespace-pre-wrap">{modal.content}</div>

        {modal.onCancel && (
          <Button.GRAY
            text={modal.cancelText || '취소'}
            onClick={(e) => handleCancel(e)}
          />
        )}

        {modal.onConfirm && (
          <Button.BLUE
            text={modal.confirmText || '확인'}
            onClick={(e) => handleConfirm(e)}
          />
        )}
      </div>
    </div>,
    modalRoot.current,
  );
};
