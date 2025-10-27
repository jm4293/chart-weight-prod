'use client';

import { useToast } from '@/hooks/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWeightAction, deleteWeightAction } from '../action';

export const useWeightMutation = () => {
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const createWeight = useMutation({
    mutationFn: async (data: FormData) => {
      const result = await createWeightAction(data);

      if (!result.success) {
        throw new Error(result.error || '등록 중 오류가 발생했습니다.');
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weightList'] });

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
      const result = await deleteWeightAction(weightId);

      if (!result.success) {
        throw new Error(result.error || '삭제 중 오류가 발생했습니다.');
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['weightList'] });

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
