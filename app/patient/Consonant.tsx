"use client";

import { Dispatch, SetStateAction } from "react";

interface IProps {
  selectedConsonant: string | null;
  setSelectedConsonant: Dispatch<SetStateAction<string | null>>;
}

const consonants = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export default function Consonant(props: IProps) {
  const { selectedConsonant, setSelectedConsonant } = props;

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      <button
        className={`text-2xl p-3 rounded border ${
          selectedConsonant === null
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
        onClick={() => setSelectedConsonant(null)}
      >
        전체
      </button>
      {consonants.map((c) => (
        <button
          key={c}
          className={`text-2xl p-4 rounded border ${
            selectedConsonant === c
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setSelectedConsonant(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
