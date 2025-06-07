import Link from "next/link";
import User from "./User";

export default function Home() {
  return (
    <div className="w-full px-16 mt-8">
      <User />

      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-4">환영합니다!</h1>
        <p className="mb-4">등록을 원하시면 아래 버튼을 클릭하세요.</p>
        <Link
          href="/register"
          className="w-full bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors text-center"
        >
          등록하기
        </Link>
      </div>
    </div>
  );
}
