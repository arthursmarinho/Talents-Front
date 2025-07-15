import Link from "next/link";

export default function RedirectCandidate() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-6">
          Essa página é apenas para candidatos!
        </h1>

        <p className="mb-8 text-gray-300">
          Acesse com uma conta de candidato ou continue para a área de
          empresarial.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Ir para a tela de login
          </Link>
          <Link
            href="/dashboard-enterprise "
            className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition"
          >
            Ir para a tela de empresa
          </Link>
        </div>
      </div>
    </div>
  );
}
