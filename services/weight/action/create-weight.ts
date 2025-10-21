'use server';

import { serverClient } from '@/lib/supabase';
import { IUserModel } from '@/services/user';
import dayjs from 'dayjs';

interface IProps {
  userInfo: IUserModel;
  file: File;
}

export async function createWeight(params: IProps) {
  const { userInfo, file } = params;

  const supabase = await serverClient();

  const today = dayjs().format('YYYY-MM-DD');

  const { data, error } = await supabase.storage
    .from('images')
    .upload(`${today}/${userInfo.id}_${file.name}`, file, {
      contentType: file.type,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  if (!data) {
    return { success: false, error: 'File upload failed' };
  }

  const { id, path, fullPath } = data;

  const { data: weightData, error: weightError } = await supabase
    .from('weight')
    .insert({
      userId: userInfo.id,
      weight: null,
      imageUrl: fullPath,
    })
    .single();

  if (weightError) {
    return { success: false, error: weightError.message };
  }

  return { success: true, data: weightData };
}
