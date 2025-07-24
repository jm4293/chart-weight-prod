import Link from "next/link";

export default function AdminHomeButton() {
  return (
    <Link
      href="/admin"
      className="w-full mt-4 bg-gray-500 text-4xl text-white p-4 rounded hover:bg-gray-600 transition-colors text-center"
    >
      관리자 페이지 - 처음으로 돌아가기
    </Link>
  );
}
