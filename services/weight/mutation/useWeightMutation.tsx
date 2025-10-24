'use client';

import { useToast } from '@/hooks/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useWeightMutation = () => {
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const createWeight = useMutation({
    mutationFn: (data: FormData) => {
      return fetch('/api/user/weight', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weightList'] });

      openToast({
        type: 'success',
        message: '몸무게가 성공적으로 등록되었습니다.',
      });
    },
    onError: () => {
      openToast({
        type: 'error',
        message: '등록 중 오류가 발생했습니다.',
      });
    },
  });

  const deleteWeight = useMutation({
    mutationFn: (id: number) => {
      return fetch(`/api/user/weight/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['weightList'] });

      openToast({
        type: 'success',
        message: '몸무게가 성공적으로 삭제되었습니다.',
      });
    },
  });

  return {
    createWeight,
    deleteWeight,
  };
};
