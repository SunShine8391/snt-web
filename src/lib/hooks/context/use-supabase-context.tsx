import { useContext } from "react";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseContext } from "../providers/supabase-provider";

export type {
  Session,
  User,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";

export const useSupabaseContext = () => {
  const context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error(
      `useSupabaseContext must be used within a SupabaseContextProvider.`,
    );
  }

  return context;
};

export function useSupabaseClient<
  Database = any,
  SchemaName extends string & keyof Database = "public" extends keyof Database
  ? "public"
  : string & keyof Database,
>() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error(
      `useSupabaseClient must be used within a SupabaseContextProvider.`,
    );
  }

  return context.supabaseClient as SupabaseClient<Database, SchemaName>;
}


