"use client";

import { useUser } from "@/context/UserContext";
import { userTypeLabel } from "@/enums/UserType";
import Config from "./config";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="w-full bg-gradient-to-r from-white to-gray-100 shadow-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Talents
      </h1>

      <div className="flex flex-col items-start sm:items-end text-sm sm:text-base gap-1">
        <span className="text-gray-800">
          Bem-vindo,{" "}
          <span className="font-semibold text-blue-600">{user?.username}</span>
        </span>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-gray-600">
          <span>
            Tipo de conta:{" "}
            <span className="font-medium text-gray-700">
              {user && userTypeLabel(user.type)}
            </span>
          </span>
          <Config />
        </div>
      </div>
    </header>
  );
}
