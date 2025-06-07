import { getUser } from "./actions";
import Link from "next/link";
import Modify from "./Modify";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userId = Number(id);
  const user = await getUser(userId);

  return (
    <div className="flex flex-col gap-4">
      <Modify userId={userId} user={user} />

      <Link
        href="/admin/user"
        className="w-full bg-gray-500 text-white p-4 rounded hover:bg-gray-600 transition-colors text-center"
      >
        관리자페이지로 돌아가기
      </Link>
    </div>
  );
}
