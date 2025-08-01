import { IToastState, toastAtom } from '@/stores/toast.atom';
import { useAtom } from 'jotai';

export const useToast = () => {
  const [toast, setToast] = useAtom(toastAtom);

  const openToast = (params: Omit<IToastState, 'visible'>) => {
    const { message, type = 'info' } = params;

    setToast({
      visible: true,
      message,
      type,
    });
  };

  const closeToast = () => {
    setToast({
      visible: false,
      message: '',
      type: 'info',
    });
  };

  return { toast, openToast, closeToast };
};
