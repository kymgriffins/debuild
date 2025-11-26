import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-ref') || supabaseKey.includes('your-publishable-or-anon-key')) {
    console.warn("Supabase environment variables not configured. Using mock data for development.");
    // Return a mock client that will fail gracefully
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
