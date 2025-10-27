import { useQuery } from '@tanstack/react-query';
import { IUserModel } from '../model';

interface IProps {
  userId: string;
}

export const useUser = (props: IProps) => {
  const { userId } = props;

  return useQuery<IUserModel>({
    queryKey: ['user', userId],
    queryFn: () =>
      fetch(`/api/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });
};
