import { createClient } from './supabase/client';

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error);
    throw error;
  }

  // Redirect to login page
  window.location.href = '/auth/login';
}

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = '/auth/login';
    return null;
  }

  return user;
}
