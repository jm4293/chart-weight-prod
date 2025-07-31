'use server';

import { serverClient } from '@/lib/supabase/server';
import { IPatientEntity } from '../entity';

export const getPatientList = async (): Promise<IPatientEntity[]> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('patient')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
};
