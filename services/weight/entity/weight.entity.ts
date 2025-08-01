import { IPatientEntity } from '@/services/patient';

export interface IWeightEntity {
  id: string;
  weight: number;
  image: string | null;
  patientId: string;
  created_at: Date;

  patient?: IPatientEntity;
}
