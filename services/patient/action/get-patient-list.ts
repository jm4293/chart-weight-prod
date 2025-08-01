'use server';

import { serverClient } from '@/lib/supabase';
import { IPatientEntity } from '../entity';

export const getPatientList = async (): Promise<IPatientEntity[]> => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('patient')
    .select('*')
    .order('name', { ascending: true });

  if (error || !data) {
    return [];
  }

  return data;
};
