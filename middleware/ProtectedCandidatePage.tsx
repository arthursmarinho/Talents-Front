"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedCandidate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/dashboard-candidate/redirect-candidate");
    }
  }, [user, router]);

  if (!user || user.type !== "candidate") {
    return null;
  }

  return <>{children}</>;
}
