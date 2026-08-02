import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite, with fallbacks for production deployment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://bkkkidzjttndmliurrmm.supabase.co"; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_XMq1qb5Ke9NgjWJQ2stHrQ_6BGhH8lW";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase URL or Anon Key missing.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);