import { useAtom } from "jotai";
import { defaultModalState, modalAtom, ModalState } from "@/store/modal-atom";

export function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = (params: Omit<ModalState, "visible">) => {
    setModal({
      ...params,
      visible: true,
    });
  };

  const closeModal = () => {
    setModal({ ...defaultModalState });
  };

  return { modal, openModal, closeModal };
}
