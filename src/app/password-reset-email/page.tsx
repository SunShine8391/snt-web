"use client";

import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import { SupabaseContext } from "@/lib/hooks/providers/supabase-provider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const PasswordResetPage = () => {
  const router = useRouter();
  const { supabaseClient } = useContext(SupabaseContext);
  const [address, setAddress] = useState<string>("");

  const handlePasswordReset = async () => {
    try {
      await supabaseClient.auth
        .resetPasswordForEmail(address, {
          redirectTo: "http://localhost:3000/password-reset",
        })
        .then(() => router.push(routes.base.passwordComfirm));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-full flex flex-col justify-center items-center gap-8 px-2 pt-16"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className="flex flex-col gap-2 items-center w-full max-w-sm xl:max-w-md">
        <div className="text-center pb-4">
          Enter the email address associated with your account. We&#39;ll send
          you a link to reset your password.
        </div>
        <label className="input input-bordered w-full flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <Button className="h-12 w-full" onClick={() => handlePasswordReset()}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
