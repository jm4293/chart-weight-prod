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

      return fetch(`/api/user/patient/${id}`, {
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

  return {
    modifyUser,
  };
};
