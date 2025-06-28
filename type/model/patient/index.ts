import { IWeightModel } from "@/type/model/weight";

export interface IPatientModel {
  id: number;
  name: string;
  birth: number;
  register_num: string;
  created_at: Date;
  weights: IWeightModel[];
}
