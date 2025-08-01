import { atom } from 'jotai';

export interface IModalState {
  visible: boolean;
  title?: string;
  content?: string | React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
}

export const modalAtom = atom<IModalState>({
  visible: false,
  title: '',
  content: '',
  onConfirm: undefined,
  confirmText: undefined,
  onCancel: undefined,
  cancelText: undefined,
});
