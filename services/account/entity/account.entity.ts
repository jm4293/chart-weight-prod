import { AccountStatus, AccountType } from '@/shared/enum/account';

export interface IAccountEntity {
  id: string;
  email: string;
  name: string;
  type: AccountType;
  status: AccountStatus;
  created_at: Date;
}
