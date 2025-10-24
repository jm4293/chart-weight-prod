'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserModel } from '../model';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/modal';

export const useUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const modifyUser = useMutation({
    mutationFn: (
      dto: Pick<IUserModel, 'id' | 'birth' | 'registerNumber' | 'status'>,
    ) => {
      const { id } = dto;

      return fetch(`/api/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dto),
        headers: {
          'Content-Type': 'application/json',
        },
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
    mutationFn: (id: string) => {
      return fetch(`/api/user/${id}`, {
        method: 'DELETE',
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
