import { serverClient } from '@/lib/supabase';
import { IWeightModel } from '../model';

export const getWeightList = async (
  patientId: string,
): Promise<IWeightModel[]> => {
  const supabase = await serverClient();

  // 한국 시간(UTC+9) 오늘의 0시~24시를 UTC로 변환
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth(); // 0-based
  const dd = now.getDate();

  // 한국 0시(=UTC-9시)
  const start = new Date(Date.UTC(yyyy, mm, dd, -9, 0, 0));

  // 다음날 한국 0시(=UTC-9시)
  const end = new Date(Date.UTC(yyyy, mm, dd + 1, -9, 0, 0));
  const startStr = start.toISOString();
  const endStr = end.toISOString();

  const { data, error } = await supabase
    .from('weight')
    .select('*')
    .eq('patientId', patientId)
    .gte('created_at', startStr)
    .lt('created_at', endStr)
    .order('created_at', { ascending: true });

  if (error || !data) {
    return [];
  }

  return data;
};
