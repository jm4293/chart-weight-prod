import { useQuery } from '@tanstack/react-query';
import { IUserModel } from '../model';

interface IProps {
  page: number;
}

export const usePatientList = (props: IProps) => {
  const { page } = props;

  return useQuery<IUserModel[] & { total: number }>({
    queryKey: ['patientList', page],
    queryFn: () =>
      fetch(`/api/user/patient?page=${page}&limit=10`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });
};
