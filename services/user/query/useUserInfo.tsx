'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserInfoByUserIdAction } from '../action/get-user-info-by-user-id.action';

export const useUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const result = await getUserInfoByUserIdAction({ userId });

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch user info');
      }

      if (!result.data) {
        throw new Error('User data is null');
      }

      return result.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 1,
  });
};
