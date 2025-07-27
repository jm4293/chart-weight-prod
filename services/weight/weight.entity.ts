export interface IWeightEntity {
  id: number;
  weight: number;
  image: string | null;
  created_at: Date;
  userId: number; // 삭제 예정
  patientId: number;
}
