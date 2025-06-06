"use server";

import { supabase } from "@/lib/supabaceClient";

export async function getUser(userId: number) {
  if (isNaN(userId)) {
    console.error("userId가 NaN입니다. 쿼리 실행하지 않음.");
    return null;
  }

  const { data, error } = await supabase.from("user").select("*").eq("id", userId).single();

  if (error) return null;

  return data;
}

export async function getWeights(userId: number) {
  if (isNaN(userId)) {
    console.error("userId가 NaN입니다. 쿼리 실행하지 않음.");
    return [];
  }

  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (error) return [];

  return data;
}

export async function addWeight(userId: number, weight: number) {
  const { error } = await supabase.from("weight").insert([{ userId, weight }]);
  if (error) return { success: false, message: error.message };
  return { success: true };
}
