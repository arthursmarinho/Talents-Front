"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cog } from "lucide-react";
import Link from "next/link";
import Profile from "./profile";

export default function Config() {
  const router = useRouter();

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Cog />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configurações</SheetTitle>
            <SheetDescription className="space-y-4 mt-2">
              <Link href="/login">
                <Button className="mb-6">Trocar de conta</Button>
              </Link>
              <Profile />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
