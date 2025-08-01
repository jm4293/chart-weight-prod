'use server';

import { serverClient } from '@/lib/supabase';

export async function createWeight(params: {
  patientId: string;
  weight: string | null;
  image: string | null;
}) {
  const { patientId, weight, image } = params;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('weight')
    .insert({
      patientId,
      weight: weight || null,
      image: image || null,
    })
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
