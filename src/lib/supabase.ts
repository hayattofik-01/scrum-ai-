import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccceiuyajfpyqagrsmsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjY2VpdXlhamZweXFhZ3JzbXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NjkzNDAsImV4cCI6MjA4MjM0NTM0MH0.vAM_3z__OQPjhHzZ3d9ctwK_0cmK9mtlnwtAl_QLowo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
