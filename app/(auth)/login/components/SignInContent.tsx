import Link from "next/link";
import LoginContent from "./LoginContent";
export const SignInContent = () => {
  return (
    <div className="flex bg-white flex-col h-screen">
      <div className="flex p-22 justify-start mt-18 md:mt-34 lg:mt-34">
        <h1 className="font-bold text-4xl">Talents</h1>
      </div>
      <div className="px-22">
        <h1 className="text-6xl font-semibold tracking-normal">
          Olá, <br />
          Bem-Vindo(a)
        </h1>
        <p className="text-gray-400">
          Seu site de gestão de gestão de candidatos
        </p>
      </div>
      <div className="mt-12 px-22">
        <LoginContent />
        <h1>
          Não tem uma conta? Crie
          <Link href="CreateAccount">
            <h1 className="text-blue-400 underline">Aqui</h1>
          </Link>
        </h1>
      </div>
    </div>
  );
};
