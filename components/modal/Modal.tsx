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
        className="w-5/6 bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}>
        <Text.HEADING text={modal.title} />

        <pre className="whitespace-pre-wrap">{modal.content}</pre>

        <div className="flex gap-2">
          {modal.onCancel && (
            <Button
              color="gray"
              text={modal.cancelText || '취소'}
              onClick={(e) => handleCancel(e)}
            />
          )}
          {modal.onConfirm && (
            <Button
              color="blue"
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
