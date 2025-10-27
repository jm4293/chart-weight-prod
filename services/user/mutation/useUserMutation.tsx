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
    mutationFn: (
      dto: { userId: number; userUuid: string } & Partial<IUserModel>,
    ) => {
      const { userId, userUuid, ...rest } = dto;

      return updateUserAction({
        userId,
        userUuid,
        updateData: rest,
      });
    },
    onSuccess: (_, value) => {
      queryClient.invalidateQueries({ queryKey: ['user', value.id] });

      openToast({
        type: 'success',
        message: '회원 정보가 성공적으로 수정되었습니다.',
      });
      router.back();
    },
  });

  const deleteUser = useMutation({
    mutationFn: (dto: { userId: number; userUuid: string }) => {
      const { userId, userUuid } = dto;

      return deleteUserAction({
        userId,
        userUuid,
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });

      openToast({
        type: 'success',
        message: '회원 정보가 성공적으로 삭제되었습니다.',
      });
    },
  });

  return {
    modifyUser,
    deleteUser,
  };
};
