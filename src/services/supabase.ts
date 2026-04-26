import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// export const BUCKETS = {
//   ARCHIVE: 'archive-images',
//   TRAVEL: 'travel-assets',
// } as const;

// export const getPublicUrl = (bucketName: string) => 
//   `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/`;

// export const ARCHIVE_URL = getPublicUrl(BUCKETS.ARCHIVE);
// export const TRAVEL_URL = getPublicUrl(BUCKETS.TRAVEL);

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

export type RegionDetailBlock =
    | { 
        type: 'text'; 
        content: string; 
      }
    | { 
        type: 'image'; 
        url: string; 
        caption: string; 
        alt_text: string; 
      };

export interface TravelRegion {
    id: string;
    sort_order: number;
    name: string;
    tagline: string;
    description: string;
    cover_image_url: string;
    thumbnail_url: string;
    details: RegionDetailBlock[];
    created_at?: string; 
}
