import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import { SupabaseContextProvider } from "@/lib/hooks/providers/supabase-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "S&T Biotech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SupabaseContextProvider>
          <Header />
          <div>{children}</div>
          <Footer />
        </SupabaseContextProvider>
      </body>
    </html>
  );
}
