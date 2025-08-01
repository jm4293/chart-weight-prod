'use server';

import { serverClient } from '@/lib/supabase';
import { IPatientEntity } from '../entity';

export const getPatient = async (
  patientId: string,
): Promise<IPatientEntity | null> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('patient')
    .select('*')
    .eq('id', patientId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};
