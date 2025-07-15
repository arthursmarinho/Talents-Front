import { useUser } from "@/context/UserContext";
import { userTypeLabel } from "@/enums/UserType";

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="flex p-4">
      <div className=" rounded-2xl max-w-md w-full">
        <div className="space-y-10">
          <div className="rounded-lg">
            <p className="text-sm md:text-xl lg:text-2xl">Email</p>
            <p className="text-[12px] md:text-lg lg:text-xl font-medium text-gray-900">
              {user?.email ?? "Não informado"}
            </p>
          </div>

          <div className="rounded-lg">
            <p className="text-sm md:text-xl lg:text-2xl">Tipo de Usuário</p>
            <p className="text-[12px] md:text-lg lg:text-xl font-medium text-gray-900">
              {user && userTypeLabel(user.type)}
            </p>
          </div>

          <div className=" rounded-lg">
            <p className="text-sm md:text-xl lg:text-2xl">Nome de Usuário</p>
            <p className="text-[12px] md:text-lg lg:text-xl font-medium text-gray-900">
              {user?.username ?? "Não informado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
