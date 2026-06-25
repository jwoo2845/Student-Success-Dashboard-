import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://vhovrprwxvzxsqqnbugd.supabase.co";

const supabaseKey =
  "sb_publishable_a_t1P5wSJv9k3qpTjDtNLQ_MssoKl_4";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );