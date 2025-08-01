'use server';

import { serverClient } from '@/lib/supabase';

export const deleteWeight = async (weightId: string) => {
  const supabase = await serverClient();

  const { error } = await supabase.from('weight').delete().eq('id', weightId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
