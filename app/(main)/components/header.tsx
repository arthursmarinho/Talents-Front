"use client";

import { useUser } from "@/context/UserContext";
import { userTypeLabel } from "@/enums/UserType";
import Config from "./config";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="h-20 px-6 bg-gradient-to-r from-white to-gray-100 shadow-sm border-b border-gray-200 flex items-center justify-between">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Talents
      </h1>

      <div className="flex flex-col items-end gap-0 text-sm sm:text-base">
        <span className="text-gray-800">
          Bem-vindo,{"  "}
          <span className="font-semibold text-blue-600"> {user?.username}</span>
        </span>
        <div className="flex items-center gap-2 text-gray-600">
          <span>
            Tipo de conta:
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
