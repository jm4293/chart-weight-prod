'use server';

import { serverClient } from '@/lib/supabase';
import { IUserModel } from '../model';

interface IUpdateUserProps {
  userId: number;
  userUuid: string;
  updateData: Partial<IUserModel>;
}

export async function updateUserAction(props: IUpdateUserProps) {
  try {
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
        error: `Error updating user: ${error.message}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
