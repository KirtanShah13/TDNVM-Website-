import { createClient } from '@supabase/supabase-js';

// ✅ Use Vite env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// ✅ Export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
