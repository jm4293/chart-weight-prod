'use server';

import { serverClient } from '@/lib/supabase';

export const deletePatient = async (patientId: string) => {
  const supabase = await serverClient();

  const { error } = await supabase.from('patient').delete().eq('id', patientId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
