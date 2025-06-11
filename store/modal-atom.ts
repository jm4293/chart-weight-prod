import { atom } from "jotai";

export interface ModalState {
  visible: boolean;
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const modalAtom = atom<ModalState>({
  visible: false,
  content: "",
});
