import { QUERY_KEY } from '@/shared/queryKey';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
}

export const useWeightList = (props: IProps) => {
  const { page } = props;

  return useQuery({
    queryKey: QUERY_KEY.WEIGHT.LIST(page),
    queryFn: () =>
      fetch(`/api/user/weight?page=${page}&limit=10`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => res.json()),
  });
};
