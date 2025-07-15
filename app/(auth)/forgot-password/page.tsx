"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email de recuperação enviado!");
    } catch (error: any) {
      toast.error("Erro ao enviar email de recuperação.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">Recuperar senha</h2>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Enviar link de recuperação
        </Button>
        <Link href="/login" className="text-blue-400 underline">
          Voltar
        </Link>
      </form>
    </div>
  );
}
