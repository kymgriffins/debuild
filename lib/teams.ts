export interface TeamMemberData {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  long_bio: string;
  image: string;
  credentials: string;
  experience: string;
  specializations: string[];
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  education: string[];
  experience_years: number;
  projects_completed: number;
  awards: string[];
  featured_projects: Array<{
    title: string;
    description: string;
    image: string;
    year: string;
  }>;
  philosophies: string[];
  skills: Array<{
    category: string;
    skills: string[];
  }>;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberDataWithLongBio extends TeamMemberData {
  longBio: string;
}

// Helper functions that use database queries
export async function getAllTeamMembers(): Promise<TeamMemberDataWithLongBio[]> {
  const { getAllTeamMembers: fetchTeamMembers } = await import('./supabase/queries');
  const members = await fetchTeamMembers();

  // Transform database format to match existing interface
  return members.map(member => ({
    ...member,
    longBio: member.long_bio,
    long_bio: undefined
  })) as TeamMemberDataWithLongBio[];
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMemberDataWithLongBio | null> {
  const { getTeamMemberBySlug: fetchMember } = await import('./supabase/queries');
  const member = await fetchMember(slug);

  if (!member) return null;

  // Transform database format to match existing interface
  return {
    ...member,
    longBio: member.long_bio,
    long_bio: undefined
  } as TeamMemberDataWithLongBio;
}

export async function getAllTeamMemberSlugs(): Promise<string[]> {
  const { getAllTeamMemberSlugs: fetchSlugs } = await import('./supabase/queries');
  return await fetchSlugs();
}
