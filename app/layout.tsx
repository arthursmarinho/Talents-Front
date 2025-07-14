import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Talent",
  description: "Gestão de candidatos para Recrutadores Freelancers!",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <Toaster richColors position="bottom-right" />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
