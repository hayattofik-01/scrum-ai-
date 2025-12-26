import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccceiuyajfpyqagrsmsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjY2VpdXlhamZweXFhZ3JzbXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMDcxNjcsImV4cCI6MjA1MDc4MzE2N30.sb_publishable_wIix7g9KAeZkDi2w4vECcA_vSXyEFRu';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
