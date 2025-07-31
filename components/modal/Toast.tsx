'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useToast } from '@/hooks/modal';

const TOAST_BG_COLOR: Record<string, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-500',
  info: 'bg-white/90 dark:bg-gray-800',
};

const TOAST_TEXT_COLOR: Record<string, string> = {
  success: 'text-white',
  error: 'text-white',
  warning: 'text-black',
  info: 'text-black dark:text-white',
};

export const Toast = () => {
  const toastRoot = useRef<Element | null>(null);

  const { toast, closeToast } = useToast();

  const bgColor = TOAST_BG_COLOR[toast.type] || TOAST_BG_COLOR.info;
  const textColor = TOAST_TEXT_COLOR[toast.type] || TOAST_TEXT_COLOR.info;

  useEffect(() => {
    toastRoot.current = document.getElementById('toast-root');
  }, []);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast.visible, closeToast]);

  if (!toastRoot.current || !toast.visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed left-1/2 bottom-8 -translate-x-1/2 px-6 py-3 rounded shadow-lg z-[1100] animate-fadeIn ${bgColor}`}
      style={{ minWidth: 200, textAlign: 'center' }}>
      <p className={`whitespace-pre-line w-full break-keep ${textColor}`}>
        {toast.message}
      </p>
    </div>,
    toastRoot.current,
  );
};
