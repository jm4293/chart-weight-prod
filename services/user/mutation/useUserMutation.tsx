'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserModel } from '../model';
import { useRouter } from 'next/navigation';

export const useUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    },
  });

  return {
    modifyUser,
    deleteUser,
  };
};
