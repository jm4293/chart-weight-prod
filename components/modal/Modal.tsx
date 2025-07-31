'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '@/hooks/modal';
import { Button } from '../button';
import { Text } from '../text';

export const Modal = () => {
  const modalRoot = useRef<Element | null>(null);

  const { modal, closeModal } = useModal();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (modal.onCancel) {
      modal.onCancel();
    }

    closeModal();
  };

  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();

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
        className="bg-white rounded-2xl shadow-lg p-6 min-w-[420px] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}>
        <Text.SUBTITLE text={String(modal.title)} />

        <Text.HEADING
          text={String(modal.content)}
          className="whitespace-pre-wrap"
        />

        <div className="flex justify-center gap-4">
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
      </div>
    </div>,
    modalRoot.current,
  );
};
