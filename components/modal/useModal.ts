import { defaultModalState, modalAtom } from '@/store';
import { useAtom } from 'jotai';

export const useModal = () => {
  const [modalState, setModalState] = useAtom(modalAtom);

  const openModal = (
    content: string,
    options?: {
      onConfirm?: () => void;
      confirmText?: string;
      onCancel?: () => void;
      cancelText?: string;
      disableClose?: boolean;
    },
  ) => {
    setModalState({
      visible: true,
      content,
      ...options,
    });
  };

  const closeModal = () => {
    setModalState({ ...defaultModalState });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};
