"use client";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcnui/button";
import { useState } from "react";
import { Input } from "@/components/shadcnui/input";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

        if (userData?.type !== "enterprise" && userData?.type !== "candidate") {
          throw new Error();
        }

        Cookies.set("token", (await userCredential.user.getIdToken()) ?? "");

        if (userData?.type === "enterprise") {
          router.push("/dashboard-enterprise");
        } else if (userData?.type === "candidate") {
          router.push("/dashboard-candidate");
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

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha..."
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

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
