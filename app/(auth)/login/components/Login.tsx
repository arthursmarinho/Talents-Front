"use client";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData?.type === "enterprise") {
          router.push("/dashboard-enterprise");
        } else if (userData?.type === "candidate") {
          router.push("/dashboard-candidate");
        } else {
          toast("Email ou senha invalidos.");
        }
      }
    } catch (error) {
      toast("Email ou senha inválidos.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-sm mx-auto gap-4">
      <h2 className="text-xl font-semibold text-center">Entrar na sua conta</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email..."
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha..."
        />
        <Button type="submit" className="w-full">
          Fazer login
        </Button>
      </form>
      <Link href="/forgot-password">
        <span className="text-blue-500 text-sm">Esqueceu a senha?</span>
      </Link>
    </div>
  );
}
