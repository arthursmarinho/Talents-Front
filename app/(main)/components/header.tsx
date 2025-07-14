"use client";

import { useUser } from "@/context/UserContext";
import { userTypeLabel } from "@/enums/UserType";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="h-20 px-6 bg-white shadow-md flex items-center justify-between">
      <h1 className="text-3xl font-bold">Talents</h1>

      <div className="flex flex-col items-end text-sm sm:text-base">
        <span className="text-gray-700">
          Bem-vindo, <span className="font-medium">{user?.email}</span>
        </span>
        <span className="text-gray-500">
          Tipo de conta:{" "}
          <span className="font-medium">
            {user && userTypeLabel(user.type)}
          </span>
        </span>
      </div>
    </header>
  );
}
