"use client";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (!user) return;
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao logar:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
      <div>
        <form className="">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
            placeholder="Digite seu email..."
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha.."
          />
        </form>
      </div>
      <div>
        <Button variant="outline" onClick={googleLogin}>
          <FcGoogle className="w-5 h-5 mr-2" />
          Entrar com Google
        </Button>
      </div>
    </div>
  );
}
