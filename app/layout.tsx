import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/utils/firebase/auth-context";

const urbanist = Urbanist();

export const metadata: Metadata = {
  title: "Healthmax Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.className}`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
