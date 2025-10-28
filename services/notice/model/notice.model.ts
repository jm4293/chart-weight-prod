import { IUserModel } from '@/services/user';

export interface INoticeModel {
  id: number;
  uuid: string;
  title: string;
  content: string;
  status: boolean;
  views: number;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  userId: number;

  user?: IUserModel;
}
