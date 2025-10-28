'use server';

import { serverClient } from '@/lib/supabase';
import { IUserModel } from '../model';
import { IResponseType } from '@/types';
import { ERROR_CODE } from '@/shared/const';

interface IUpdateUserProps {
  userId: number;
  userUuid: string;
  updateData: Partial<IUserModel>;
}

export async function updateUserAction(
  props: IUpdateUserProps,
): Promise<IResponseType<null>> {
  const { userId, userUuid, updateData } = props;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('user')
    .update(updateData)
    .eq('id', userId)
    .eq('uuid', userUuid);

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  return {
    success: true,
    data: null,
  };
}
