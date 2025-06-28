import { useQuery } from "@tanstack/react-query";
import { IPatientModel } from "@/type/model/patient";
import api from "@/common/api";

export function usePatientList() {
  return useQuery<{ patients: IPatientModel[] }>({
    queryKey: ["patients"],
    queryFn: () =>
      api.get(`${process.env.NEXT_PUBLIC_API_URL}/patient/list`).json(),
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
}
