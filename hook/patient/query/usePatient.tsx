import { useQuery } from "@tanstack/react-query";
import api from "@/common/api";
import { IPatientModel } from "@/type/model/patient";

interface IProps {
  id: string;
}

export function usePatient(props: IProps) {
  const { id } = props;

  return useQuery<{
    patient: IPatientModel;
  }>({
    queryKey: ["patient", id],
    queryFn: () =>
      api.get(`${process.env.NEXT_PUBLIC_API_URL}/patient/${id}`).json(),
    staleTime: 1000 * 60 * 60, // 1시간
  });
}
