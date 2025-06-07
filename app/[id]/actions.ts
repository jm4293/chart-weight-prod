"use server";

import { supabase } from "@/lib/supabaceClient";
import dayjs from "dayjs";

export async function getUser(userId: number) {
  if (isNaN(userId)) {
    return null;
  }

  const { data, error } = await supabase.from("user").select("*").eq("id", userId).single();

  if (error) return null;

  return data;
}

export async function getWeights(userId: number) {
  if (isNaN(userId)) {
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

export async function getWeightsToday(userId: number) {
  if (isNaN(userId)) {
    return [];
  }

  // KST 기준 오늘 00:00:00 ~ 내일 00:00:00
  const start = dayjs().tz("Asia/Seoul").startOf("day").toISOString();
  const end = dayjs().tz("Asia/Seoul").add(1, "day").startOf("day").toISOString();

  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("userId", userId)
    .gte("created_at", start)
    .lt("created_at", end)
    .order("created_at", { ascending: false });

  if (error) return [];

  return data;
}

export async function addWeight(userId: number, weight: number) {
  const { error } = await supabase.from("weight").insert([{ userId, weight }]);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function deleteWeight(weightId: number) {
  if (isNaN(weightId)) {
    return { success: false, message: "잘못된 id입니다." };
  }

  const { error } = await supabase.from("weight").delete().eq("id", weightId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
