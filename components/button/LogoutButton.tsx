"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      window.location.href = "/login";
    }
  };

  return (
    <div className="w-full flex justify-end">
      <button className="bg-red-500 text-white p-4 rounded disabled:opacity-50" onClick={handleLogout}>
        <p className="text-2xl">로그아웃</p>
      </button>
    </div>
  );
}
