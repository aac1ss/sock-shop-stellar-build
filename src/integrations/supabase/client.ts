
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eswmkmkbndgvskfroxen.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzd21rbWtibmRndnNrZnJveGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNjUyNTMsImV4cCI6MjA1OTc0MTI1M30.NMfuE2rtgvU__1SSHZiX7nuYjn__gOw9e8oCqFQN8fA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
