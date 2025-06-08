import Link from "next/link";
import Image from "next/image";
import UserList from "./UserList";

export default function Page() {
  return (
    <div>
      <UserList />

      <div className="mt-8 flex justify-end">
        <Link
          className=" bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors text-center"
          href="/admin"
        >
          관리자 페이지
        </Link>
      </div>
    </div>
  );
}
