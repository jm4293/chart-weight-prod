import { useQuery } from "@tanstack/react-query";
import api from "@/common/api";
import { IWeightModel } from "@/type/model/weight";

interface IProps {
  patient_id: string;
}

export function usePatientWeightList(props: IProps) {
  const { patient_id } = props;

  return useQuery<{
    weights: IWeightModel[];
  }>({
    queryKey: ["weight", patient_id],
    queryFn: () =>
      api
        .get(`${process.env.NEXT_PUBLIC_API_URL}/patient/weight/${patient_id}`)
        .json(),
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
}
