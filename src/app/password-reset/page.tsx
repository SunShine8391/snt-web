"use client";

import routes from "@/config/routes";
import { SupabaseContext } from "@/lib/hooks/providers/supabase-provider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const PasswordResetPage = () => {
  const router = useRouter();
  const { supabaseClient } = useContext(SupabaseContext);
  const [password, setPassword] = useState<string>("");

  const handlePasswordReset = async () => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password: password,
      });

      if (error) {
        console.log(error);
      }

      if (data) {
        router.push(routes.base.home);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-full flex flex-col justify-center items-center gap-8 pt-16"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className="flex flex-col gap-2 items-center w-full">
        <label className="input input-bordered max-w-96 w-full flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="btn btn-neutral max-w-96 w-full mt-2"
          onClick={() => handlePasswordReset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
