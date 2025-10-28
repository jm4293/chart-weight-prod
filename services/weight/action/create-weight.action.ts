'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE } from '@/shared/const';
import { IResponseType } from '@/types';
import dayjs from 'dayjs';

export async function createWeightAction(
  formData: FormData,
): Promise<IResponseType<null>> {
  const file = formData.get('file') as File;
  const userId = Number(formData.get('userId'));
  const userUuid = String(formData.get('userUuid'));

  const today = dayjs().format('YYYY-MM-DD');
  const timeNow = dayjs().format('HH-mm-ss');

  const supabase = await serverClient();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('images')
    .upload(`${today}/${userId}_${timeNow}`, file, {
      contentType: file.type,
    });

  if (uploadError) {
    return {
      success: false,
      data: null,
      error: uploadError.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  const { data, error } = await supabase.from('weight').insert({
    userId: userId,
    weight: null,
    imageUrl: uploadData.fullPath,
  });

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
