import { QUERY_KEY } from '@/shared/queryKey';
import { useQuery } from '@tanstack/react-query';
import { getNotice } from '../action';

export const useNotice = (noticeId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.NOTICE.DETAIL(noticeId),
    queryFn: async () => {
      const result = await getNotice(noticeId);

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch notice');
      }

      if (!result.data) {
        throw new Error('Notice data is null');
      }

      return result.data;
    },
    enabled: !!noticeId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 1,
  });
};
