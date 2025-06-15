"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaceClient";
import dayjs from "dayjs";

import NumberPadModal from "@/app/[id]/NumberPadModal";
import { IUserModel } from "@/type/model/user";

interface IProps {
  userId: number;
  user: IUserModel;
}

export default function WeightRegister(props: IProps) {
  const { userId, user } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [openNumberPadModal, setOpenNumberPadModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 오늘 날짜와 시간 포맷 생성
      const now = dayjs();
      const dateFolder = now.format("YY-MM-DD"); // 예: 25-06-15
      const time = now.format("HHmmss"); // 예: 143012
      const ext = file.name.split(".").pop();
      const rawName = `register_${user.register}_${time}.${ext}`;
      // 한글, 특수문자, 공백 모두 _로 치환
      const safeName = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `images/${dateFolder}/${safeName}`;
      const { data, error } = await supabase.storage
        .from("weight-image")
        .upload(filePath, file);
      if (error) {
        alert("이미지 업로드 실패: " + error.message);
        return;
      }
      const { data: publicUrlData } = supabase.storage
        .from("weight-image")
        .getPublicUrl(filePath);
      setImage(publicUrlData.publicUrl);

      // 이미지 URL을 weight 테이블에 저장
      const { error: insertError } = await supabase.from("weight").insert([
        {
          userId: userId,
          image: publicUrlData.publicUrl,
        },
      ]);
      if (insertError) {
        alert("DB 저장 실패: " + insertError.message);
      }
    }
  };

  return (
    <>
      {openNumberPadModal && (
        <NumberPadModal
          userId={userId}
          setOpenNumberPadModal={setOpenNumberPadModal}
        />
      )}

      <input
        type="file"
        accept="image/*"
        capture
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="bg-blue-500 text-4xl text-white rounded py-4"
          onClick={handleButtonClick}
        >
          사진 찍어서 등록하기
        </button>

        {image && (
          <img
            src={image}
            className="mt-4 max-w-full h-auto rounded"
            alt="촬영한 사진"
          />
        )}

        {/*<button*/}
        {/*  type="submit"*/}
        {/*  className="bg-blue-500 text-4xl text-white rounded py-4"*/}
        {/*  onClick={() => setOpenNumberPadModal(true)}*/}
        {/*>*/}
        {/*  몸무게 등록하기*/}
        {/*</button>*/}
      </div>
    </>
  );
}
