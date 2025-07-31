import { IPatientEntity } from '@/services/patient';

export interface IWeightEntity {
  id: number;
  weight: number;
  image: string | null;
  patientId: number;
  created_at: Date;

  patient?: IPatientEntity;
}
