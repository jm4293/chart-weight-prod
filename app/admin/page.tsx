import AdminPatientList from "@/app/admin/AdminPatientList";
import Link from "next/link";
import LogoutButton from "@/components/button/LogoutButton";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-12 p-4">
      <AdminPatientList />

      <Link
        href="/admin/register"
        className="w-full mt-4 bg-blue-500 text-4xl text-white p-4 rounded hover:bg-blue-600 transition-colors text-center"
      >
        환자 등록
      </Link>

      <LogoutButton />
    </div>
  );
}
