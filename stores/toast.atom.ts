import { atom } from 'jotai';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface IToastState {
  visible: boolean;
  type: ToastType;
  message: string;
}

export const toastAtom = atom({
  visible: false,
  message: '',
  type: 'info',
});
