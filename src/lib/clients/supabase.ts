import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

let client: SupabaseClient;

function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  client = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  return client;
}

export default getSupabaseBrowserClient;
