import { atom } from "jotai";

export interface ModalState {
  visible: boolean;
  content: string;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
}

export const modalAtom = atom<ModalState>({
  visible: false,
  content: "",
  onConfirm: undefined,
  confirmText: undefined,
  onCancel: undefined,
  cancelText: undefined,
});
