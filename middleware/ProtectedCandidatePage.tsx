"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedCandidate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.type !== "candidate")) {
      router.replace("/dashboard-candidate/redirect-candidate");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-lg font-semibold">Talents</p>
      </div>
    );
  }

  if (!user || user.type !== "candidate") {
    return null;
  }

  return <>{children}</>;
}
