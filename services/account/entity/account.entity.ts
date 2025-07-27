import { AccountStatus, AccountType } from '../enum';

export interface IAccountEntity {
  id: number;
  email: string;
  name: string;
  type: AccountType;
  status: AccountStatus;
  created_at: Date;
}
