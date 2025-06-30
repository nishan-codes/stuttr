import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = async () => {
  const token = await (await auth()).getToken({ template: "supabase" });
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    }
  );
};
