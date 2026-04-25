import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = 'https://afkwopzcweiyxirzwzvj.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFma3dvcHpjd2VpeXhpcnp3enZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTczMDcsImV4cCI6MjA5MjU5MzMwN30.CoEM7NTCer_HLkKBKXqM8bGs7yLkOkhmyExazu29L1w';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const BUCKET_URL = `${SUPABASE_URL}/storage/v1/object/public/archive-images/`;

export interface ArchiveMedia {
    id: string;
    title: string;
    type: string;
    year: number;
    displayYear: string;
    image_filename: string;
    created_at: string;
}
