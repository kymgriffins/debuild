import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientNavBar } from "@/components/client/ClientNavBar";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check if user has client role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "client" && profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <ClientNavBar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
