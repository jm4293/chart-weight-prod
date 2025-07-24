"use client";

import { useState, useTransition } from "react";
import { registerPatient } from "@/app/admin/register/action";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminPatientRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [registernNum, setRegisterNum] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    if (name === "" || name.trim() === "") {
      alert("이름을 입력해주세요");
      return;
    }

    if (birth === "" || birth.trim() === "") {
      alert("생년월일을 입력해주세요");
      return;
    }

    if (birth === "" || birth.trim() === "") {
      alert("등록번호를 입력해주세요");
      return;
    }

    startTransition(async () => {
      const ret = await registerPatient({
        name,
        birth,
        register_num: Number(registernNum),
      });

      console.log("registerPatient ret", ret);

      if (!ret.success) {
        alert("환자 등록에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["patient"] });

      router.push("/admin");
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 my-4">
        <div className="flex items-center">
          <p className="min-w-[140px] text text-3xl">이름:</p>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="flex items-center">
          <p className="min-w-[140px] text-3xl">생년월일:</p>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            placeholder="생년월일을 입력하세요"
          />
        </div>

        <div className="flex items-center">
          <p className="min-w-[140px] text-3xl">등록번호:</p>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={registernNum}
            onChange={(e) => setRegisterNum(e.target.value)}
            placeholder="등록번호를 입력하세요"
          />
        </div>

        <button
          className="px-10 py-4 bg-blue-500 text-4xl text-white rounded hover:bg-blue-600"
          onClick={handleConfirm}
          disabled={isPending}
        >
          환자 등록
        </button>
      </div>
    </div>
  );
}
