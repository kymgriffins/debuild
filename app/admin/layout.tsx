import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminNavBar } from '@/components/admin/AdminNavBar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user has admin role (you'll need to set this up in your database)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavBar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
