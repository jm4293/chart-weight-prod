export enum AccountType {
  MASTER = 1,
  ADMIN = 2,
  DOCTOR = 3,
  NURSE = 4,
  PATIENT = 5,
  FAMILY = 6,
  OTHER = 99,
  UNKNOWN = 100,
}

export const AccountTypeLabels: Record<AccountType, string> = {
  [AccountType.MASTER]: '마스터',
  [AccountType.ADMIN]: '관리자',
  [AccountType.DOCTOR]: '의사',
  [AccountType.NURSE]: '간호사',
  [AccountType.PATIENT]: '환자',
  [AccountType.FAMILY]: '가족',
  [AccountType.OTHER]: '기타',
  [AccountType.UNKNOWN]: '알 수 없음',
};
