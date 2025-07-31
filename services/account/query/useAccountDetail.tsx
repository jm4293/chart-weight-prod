import { browserClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { IAccountEntity } from '../entity';

export const useAccountDetail = (id: string) => {
  return useQuery<IAccountEntity>({
    queryKey: ['account', id],
    queryFn: async () => {
      const supabase = browserClient();

      const { data, error } = await supabase
        .from('account')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        throw new Error('Failed to fetch account details');
      }

      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};
