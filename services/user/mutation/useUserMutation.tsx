'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserModel } from '../model';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/modal';
import { deleteUserAction, updateUserAction } from '../action';

export const useUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const modifyUser = useMutation({
    mutationFn: async (
      dto: { userId: number; userUuid: string } & Partial<IUserModel>,
    ) => {
      const { userId, userUuid, ...rest } = dto;

      const { success } = await updateUserAction({
        userId,
        userUuid,
        updateData: rest,
      });

      if (!success) {
        throw new Error('Failed to update user.');
      }
    },
    onSuccess: (_, value) => {
      queryClient.invalidateQueries({ queryKey: ['user', value.id] });

      openToast({
        type: 'success',
        message: '회원 정보가 성공적으로 수정되었습니다.',
      });
      router.back();
    },
    onError: (error) => {
      openToast({
        type: 'error',
        message: `회원 정보 수정에 실패했습니다. ${error}`,
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (dto: { userId: number; userUuid: string }) => {
      const { userId, userUuid } = dto;

      const { success, code } = await deleteUserAction({
        userId,
        userUuid,
      });

      if (!success) {
        throw new Error(`Failed to delete user. Code: ${code}`);
      }
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });

      openToast({
        type: 'success',
        message: '회원 정보가 성공적으로 삭제되었습니다.',
      });
    },
    onError: (error) => {
      openToast({
        type: 'error',
        message: `회원 정보 삭제에 실패했습니다. ${error}`,
      });
    },
  });

  return {
    modifyUser,
    deleteUser,
  };
};
