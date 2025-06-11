import { atom } from "jotai";

export const modalAtom = atom<{
  open: boolean;
  onClick?: () => void;
}>({
  open: false,
  onClick: undefined,
});

export const openNumberPadModalAtom = atom(
  null,
  (get, set, payload: { open: boolean; onClick?: () => void }) => {
    set(modalAtom, {
      open: true,
      onClick: payload.onClick,
    });
  },
);

export const closeNumberPadModalAtom = atom(null, (get, set) => {
  set(modalAtom, { open: false, onClick: undefined });
});
