import { createClient } from '@supabase/supabase-js';

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
