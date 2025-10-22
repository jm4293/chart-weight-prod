export interface IWeightModel {
  id: string;
  uuid: string;
  weight: number | null;
  imageUrl: string | null;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
}
