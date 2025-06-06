"use server";

import { supabase } from "@/lib/supabaceClient";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const age = Number(formData.get("age"));

  const { error } = await supabase.from("user").insert([{ name, age }]);

  if (error) {
    return { success: false, message: "등록 실패: " + error.message };
  }
  return { success: true, message: "등록 성공!" };
}
