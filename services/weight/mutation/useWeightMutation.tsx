'use client';

import { useToast } from '@/hooks/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWeightAction, deleteWeightAction } from '../action';
import { QUERY_KEY } from '@/shared/queryKey';

export const useWeightMutation = () => {
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const createWeight = useMutation({
    mutationFn: async (data: FormData) => {
      const { success, code } = await createWeightAction(data);

      if (!success) {
        throw new Error(code || '등록 중 오류가 발생했습니다.');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WEIGHT.LIST(),
      });

      openToast({
        type: 'success',
        message: '몸무게가 성공적으로 등록되었습니다.',
      });
    },
    onError: (error: Error) => {
      openToast({
        type: 'error',
        message: error.message || '등록 중 오류가 발생했습니다.',
      });
    },
  });

  const deleteWeight = useMutation({
    mutationFn: async (weightId: number) => {
      const { success, error } = await deleteWeightAction(weightId);

      if (!success) {
        throw new Error(error || '삭제 중 오류가 발생했습니다.');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.WEIGHT.LIST(),
      });

      openToast({
        type: 'success',
        message: '몸무게가 성공적으로 삭제되었습니다.',
      });
    },
    onError: (error: Error) => {
      openToast({
        type: 'error',
        message: error.message || '삭제 중 오류가 발생했습니다.',
      });
    },
  });

  return {
    createWeight,
    deleteWeight,
  };
};
