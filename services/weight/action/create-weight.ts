'use server';

import { serverClient } from '@/lib/supabase/server';

export async function createWeight(params: {
  patientId: string;
  weight: string;
}) {
  const { patientId, weight } = params;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('weight')
    .insert({ userId: patientId, patientId, weight })
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
