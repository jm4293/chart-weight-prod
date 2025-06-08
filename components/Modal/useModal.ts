import { useAtom } from "jotai";
import { modalAtom } from "./modalAtom";

export function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = (content: string, onConfirm?: () => void, onCancel?: () => void) => {
    setModal({ visible: true, content, onConfirm, onCancel });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  return { modal, openModal, closeModal };
}
