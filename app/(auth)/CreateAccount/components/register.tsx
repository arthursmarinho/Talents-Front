"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { passwordRequirements, schema } from "@/validators/PasswordValidator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("candidate");

  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        type: userType,
      });
      toast("Conta criada com sucesso");
      router.push("/login");
    } catch (error) {
      toast("Erro ao criar conta");
      console.error(error);
    }
  };

  const allValid = passwordRequirements.every((req) => req.test(password));

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Criar Conta</h2>

        <Input
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul className="text-sm space-y-1 pl-1">
          {passwordRequirements.map((req, idx) => {
            const passed = req.test(password);
            return (
              <li
                key={idx}
                className={`flex items-center gap-2 ${
                  passed ? "text-green-600" : "text-red-500"
                }`}
              >
                {passed ? "✅" : "❌"} {req.label}
              </li>
            );
          })}
        </ul>
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Candidato ou empresa?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Opções</SelectLabel>
              <SelectItem value="candidate">Candidato</SelectItem>
              <SelectItem value="enterprise">Empresa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={!allValid}
        >
          Criar conta
        </Button>
        <div className="flex flex-row w-full">
          <Link href="login">
            <h1 className="text-blue-400">Já tem uma conta? Faça login aqui</h1>
          </Link>
        </div>
      </form>
    </div>
  );
}
