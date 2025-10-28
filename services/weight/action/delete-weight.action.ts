'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE } from '@/shared/const';
import { IResponseType } from '@/types';

export async function deleteWeightAction(
  weightId: number,
): Promise<IResponseType<null>> {
  const supabase = await serverClient();

  const { error } = await supabase.from('weight').delete().eq('id', weightId);

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
