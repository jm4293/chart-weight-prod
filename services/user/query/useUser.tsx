import { useQuery } from '@tanstack/react-query';
import { IUserModel } from '../model';

interface IProps {
  id: string;
}

export const useUser = (props: IProps) => {
  const { id } = props;

  return useQuery<IUserModel>({
    queryKey: ['user', id],
    queryFn: () =>
      fetch(`/api/user/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });
};
