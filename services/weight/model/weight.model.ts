export interface IWeightModel {
  id: number;
  uuid: string;
  weight: number | null;
  imageUrl: string | null;
  patientId: string;
  createdAt: Date;
  updatedAt: Date | null;
}
