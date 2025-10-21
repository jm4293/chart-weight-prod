'use server';

import { serverClient } from '@/lib/supabase';
import { IUserModel } from '@/services/user';

interface IProps {
  userInfo: IUserModel;
  file: File;
}

export async function createWeight(params: IProps) {
  const { userInfo, file } = params;

  const supabase = await serverClient();

  // const { data, error } = await supabase
  //   .from('weight')
  //   .insert({
  //     patientId,
  //     weight: weight || null,
  //     image: image || null,
  //   })
  //   .single();

  // if (error) {
  //   return { success: false, error: error.message };
  // }

  // return { success: true, data };

  const { data, error } = await supabase.storage
    .from('images')
    .upload(`${Date.now()}_${file.name}`, file, {
      contentType: file.type,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data) {
    const { id, path, fullPath } = data;
    const { data: weightData, error: weightError } = await supabase
      .from('weight')
      .insert({
        userId: userInfo.id,
        weight: null,
        image: fullPath,
      })
      .single();

    if (weightError) {
      return { success: false, error: weightError.message };
    }

    return { success: true, data: weightData };
  }

  return { success: false, error: 'Unknown error' };
}
