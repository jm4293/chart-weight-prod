export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  SUSPENDED = 3,
  DELETED = 4,
  PENDING = 5,
  UNKNOWN = 99,
}
export const UserStatusLabels: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: '활성',
  [UserStatus.INACTIVE]: '비활성',
  [UserStatus.SUSPENDED]: '정지',
  [UserStatus.DELETED]: '삭제',
  [UserStatus.PENDING]: '대기',
  [UserStatus.UNKNOWN]: '알 수 없음',
};
