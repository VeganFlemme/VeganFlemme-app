import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client
 *
 * Utilise les variables d'environnement exposées par Next.js pour créer un client
 * côté client et côté serveur. Assurez‑vous de définir ces variables dans votre
 * fichier .env.local ou via les variables d'environnement sur Vercel.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)