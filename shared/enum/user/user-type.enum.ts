export enum UserType {
  ADMIN = 1,
  DOCTOR = 3,
  NURSE = 4,
  PATIENT = 5,
  // FAMILY = 6,
  // OTHER = 99,
  UNKNOWN = 100,
}

export const UserTypeLabels: Record<UserType, string> = {
  [UserType.ADMIN]: '관리자',
  [UserType.DOCTOR]: '의사',
  [UserType.NURSE]: '간호사',
  [UserType.PATIENT]: '환자',
  // [UserType.FAMILY]: '가족',
  // [UserType.OTHER]: '기타',
  [UserType.UNKNOWN]: '알 수 없음',
};
