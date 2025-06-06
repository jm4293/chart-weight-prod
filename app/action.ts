"use server";

import { supabase } from "@/lib/supabaceClient";

export async function fetchUsers() {
  const { data, error } = await supabase.from("user").select("*").order("id", { ascending: false });

  if (error) return [];

  return data;
}
