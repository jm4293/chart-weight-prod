import { useAtom } from "jotai";
import { modalAtom } from "@/store/modal-atom";

export function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = (params: {
    content: string;
    onConfirm?: () => void;
    confirmText?: string;
    onCancel?: () => void;
    cancelText?: string;
  }) => {
    const { content, onConfirm, confirmText, onCancel, cancelText } = params;

    setModal({
      visible: true,
      content,
      onConfirm,
      confirmText,
      onCancel,
      cancelText,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  return { modal, openModal, closeModal };
}
