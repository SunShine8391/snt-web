"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, PropsWithChildren } from "react";

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import getSupabaseBrowserClient from "@/lib/clients/supabase";


export interface SupabaseContextStateProps {
  session: Session | null;
  setSession: Dispatch<Session | null>;
  supabaseClient: SupabaseClient;
}

export const initialSupabaseContextState: SupabaseContextStateProps = {
  session: null,
  setSession: () => null,
  supabaseClient: {} as any,
};

export const SupabaseContext = createContext<SupabaseContextStateProps>(
  initialSupabaseContextState,
);

export const SupabaseContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [supabaseClient] = useState<any>(getSupabaseBrowserClient());
  const [session, setSession] = useState<any>();

  const getSession = async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    setSession(session);
  }

  const value: SupabaseContextStateProps = useMemo(() => {
    const baseContextValue = {
      session: session,
      supabaseClient,
      setSession,
    };
    return baseContextValue;
  }, [session, supabaseClient]);

  useEffect(() => {
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};
