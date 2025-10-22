import { useQuery } from '@tanstack/react-query';

interface IProps {
  page: number;
}

export const useWeightList = (props: IProps) => {
  const { page } = props;

  return useQuery({
    queryKey: ['weightList', page],
    queryFn: () =>
      fetch(`/api/user/weight?page=${page}&limit=20`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => res.json()),
  });
};
