import Link from "next/link";
import Login from "./Login";

export const SignInContent = () => {
  return (
    <div className="flex flex-col justify-center px-6 py-10 md:px-16 lg:px-24 h-full">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Talents</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Olá, <br />
          Bem-Vindo(a)
        </h2>
        <p className="text-gray-500 mt-2">Seu próximo emprego está aqui!</p>
      </div>

      <div className="space-y-4">
        <Login />
        <div className="flex justify-center">
          <Link href="/CreateAccount" className="text-blue-500 underline">
            Não tem uma conta? Crie aqui
          </Link>
        </div>
      </div>
    </div>
  );
};
