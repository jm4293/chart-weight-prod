"use server";

import { supabase } from "@/lib/supabaceClient";
import dayjs from "dayjs";
import { IWeightModel } from "@/type/model/weight";
import api from "@/common/api";
import { cookies } from "next/headers";

// export async function getWeightsToday(userId: number): Promise<IWeightModel[]> {
//   if (isNaN(userId)) {
//     return [];
//   }
//
//   // KST 기준 오늘 00:00:00 ~ 내일 00:00:00
//   const start = dayjs().tz("Asia/Seoul").startOf("day").toISOString();
//   const end = dayjs()
//     .tz("Asia/Seoul")
//     .add(1, "day")
//     .startOf("day")
//     .toISOString();
//
//   const { data, error } = await supabase
//     .from("weight")
//     .select("*")
//     .eq("userId", userId)
//     .gte("created_at", start)
//     .lt("created_at", end)
//     .order("created_at", { ascending: true });
//
//   if (error) {
//     return [];
//   }
//
//   return data;
// }

export async function registerWeight(id: number, weight: string) {
  const cookie = (await cookies()).get("connect.sid");

  const ret = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/patient/weight`,
    {
      json: { id, weight },
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    },
  );

  if (!ret.ok) {
    return { success: false };
  }

  return { success: true };
}

export async function addWeightWithImage(id: number, file: File) {
  const cookie = (await cookies()).get("connect.sid");

  const formData = new FormData();
  formData.append("id", String(id));
  formData.append("file", file);

  const ret = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/patient/weight-image`,
    {
      body: formData,
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    },
  );

  if (!ret.ok) {
    return { success: false };
  }

  return { success: true };
}

export async function deleteWeight(id: number) {
  const cookie = (await cookies()).get("connect.sid");

  const ret = await api.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/patient/weight/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    },
  );

  if (!ret.ok) {
    return { success: false };
  }

  return { success: true };
}
