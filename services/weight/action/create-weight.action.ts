'use server';

import { serverClient } from '@/lib/supabase';
import dayjs from 'dayjs';

interface IVerifiedToken {
  userId: number;
  userUid: string;
}

interface ICreateWeightResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function createWeightAction(
  formData: FormData,
): Promise<ICreateWeightResponse> {
  try {
    const file = formData.get('file') as File;
    const userId = Number(formData.get('userId'));
    const userUid = String(formData.get('userUid'));

    const supabase = await serverClient();
    const today = dayjs().format('YYYY-MM-DD');
    const timeNow = dayjs().format('HH-mm-ss');

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(`${today}/${userId}_${timeNow}`, file, {
        contentType: file.type,
      });

    if (uploadError) {
      return {
        success: false,
        error: uploadError.message,
      };
    }

    if (!uploadData) {
      return {
        success: false,
        error: 'File upload failed',
      };
    }

    const { data: weightData, error: weightError } = await supabase
      .from('weight')
      .insert({
        userId: userId,
        weight: null,
        imageUrl: uploadData.fullPath,
      });

    if (weightError) {
      return {
        success: false,
        error: weightError.message,
      };
    }

    return {
      success: true,
      data: weightData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
