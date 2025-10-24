import { useQuery } from '@tanstack/react-query';
import { IUserModel } from '../model';

interface IProps {
  page: number;
}

export const useMemberList = (props: IProps) => {
  const { page } = props;

  return useQuery<IUserModel[] & { total: number }>({
    queryKey: ['memberList', page],
    queryFn: () =>
      fetch(`/api/user/member?page=${page}&limit=20`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });
};
