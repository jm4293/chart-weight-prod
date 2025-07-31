import { IModalState, modalAtom } from '@/stores/modal.atom';
import { useAtom } from 'jotai';

export const useModal = () => {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = (params: Omit<IModalState, 'visible'>) => {
    const {
      title = '알림',
      content,
      onConfirm,
      confirmText,
      onCancel,
      cancelText,
    } = params;

    setModal({
      visible: true,
      title: title,
      content,
      onConfirm,
      confirmText,
      onCancel,
      cancelText,
    });
  };

  const closeModal = () => {
    setModal({
      visible: false,
      title: '',
      content: '',
      onConfirm: undefined,
      confirmText: undefined,
      onCancel: undefined,
      cancelText: undefined,
    });
  };

  return { modal, openModal, closeModal };
};
