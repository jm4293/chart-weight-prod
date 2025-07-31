import { atom } from 'jotai';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface IToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

export const toastAtom = atom<IToastState>({
  visible: false,
  message: '',
  type: 'info',
});

// export const showToastAtom = atom(null, (get, set, payload: { message: string; type?: ToastType }) => {
//   set(toastAtom, { open: true, message: payload.message, type: payload.type ?? 'info' });
// });
//
// export const hideToastAtom = atom(null, (get, set) => {
//   set(toastAtom, { open: false, message: '', type: 'info' });
// });
