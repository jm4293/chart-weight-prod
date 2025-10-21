import { IPatientEntity } from '@/services/patient';

export interface IWeightEntity {
  id: string;
  uuid: string;
  weight: number | null;
  imageUrl: string | null;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
}
