"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcnui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcnui/sheet";
import { CogIcon } from "lucide-react";
import Link from "next/link";
import Profile from "./Profile";

export default function Config() {
  const router = useRouter();

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <CogIcon />
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
