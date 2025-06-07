"use server";

import { supabase } from "@/lib/supabaceClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const inputPassword = formData.get("password") as string;
  const { data, error } = await supabase.from("admin").select("password").single();

  if (error || !data) {
    throw new Error("관리자 정보 조회 실패");
  }

  if (inputPassword === data.password) {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true");
    redirect("/admin/user");
  }

  return { success: false, message: "비밀번호가 일치하지 않습니다." };
}

export async function deleteUser(userId: number) {
  if (isNaN(userId)) {
    return { success: false, message: "잘못된 id입니다." };
  }
  const { error } = await supabase.from("user").delete().eq("id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
