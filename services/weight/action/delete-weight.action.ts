'use server';

import { serverClient } from '@/lib/supabase';

interface IDeleteWeightResponse {
  success: boolean;
  error?: string;
}

export async function deleteWeightAction(
  weightId: number,
): Promise<IDeleteWeightResponse> {
  try {
    const supabase = await serverClient();

    const { error } = await supabase.from('weight').delete().eq('id', weightId);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
