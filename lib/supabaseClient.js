import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://vycvllswvwdfaxjgocgk.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_ph_K8P9IqgRVS5vXpWq-sQ_nar9oQRJ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
