"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedEnterprise({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/dashboard-enterprise/redirect-enterprise");
    }
  }, [user, router]);

  if (!user || user.type !== "enterprise") {
    return null;
  }

  return <>{children}</>;
}
