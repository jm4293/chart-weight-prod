import { browserClient } from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

const useAccount = () => {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const supabase = browserClient();
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        return data.user;
      }

      return null;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export default useAccount;
