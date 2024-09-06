"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { MobileSidebar } from "./views/management/mobile-sidebar";
import { useRouter } from "next/navigation";
import routes from "@/config/routes";
import Image from "next/image";
import { useSupabaseContext } from "@/lib/hooks/context/use-supabase-context";
import { Button } from "./ui/button";

export default function Header() {
  const router = useRouter();

  const { supabaseClient, session, setSession } = useSupabaseContext();

  const handleSignOut = async () => {
    try {
      await supabaseClient.auth.signOut().then(() => {
        router.push(routes.base.home);
        setSession(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/home"}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Image
            src="/images/snt-logo.png"
            alt="S&T Biotech Logo"
            width={180}
            height={30}
          />
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {session === null ? (
            <Link href={routes.base.signIn}>
              <Button className="h-12">Sign In</Button>
            </Link>
          ) : (
            <Button className="h-12" onClick={() => handleSignOut()}>
              Sign Out
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
