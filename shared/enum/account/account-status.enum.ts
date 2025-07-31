export enum AccountStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  SUSPENDED = 3,
  DELETED = 4,
  PENDING = 5,
  UNKNOWN = 99,
}
export const AccountStatusLabels: Record<AccountStatus, string> = {
  [AccountStatus.ACTIVE]: '활성',
  [AccountStatus.INACTIVE]: '비활성',
  [AccountStatus.SUSPENDED]: '정지',
  [AccountStatus.DELETED]: '삭제',
  [AccountStatus.PENDING]: '대기',
  [AccountStatus.UNKNOWN]: '알 수 없음',
};
