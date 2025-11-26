// Project data types and database queries

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  long_description: string;
  images: string[];
  year: string;
  location: string;
  size: string;
  status: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectDataWithLongDescription extends ProjectData {
  longDescription: string;
}

// Helper functions that use database queries
export async function getAllProjects(): Promise<ProjectData[]> {
  try {
    const { getAllProjects: fetchProjects } = await import('./supabase/queries');
    const projects = await fetchProjects();

    // Transform database format to match existing interface
    return projects.map(project => ({
      ...project,
      longDescription: project.long_description,
      long_description: undefined
    })) as ProjectDataWithLongDescription[];
  } catch (error) {
    // If Supabase is not configured, return empty array for now
    if (error instanceof Error && error.message === "SUPABASE_NOT_CONFIGURED") {
      console.warn("Supabase not configured - returning empty projects array. Set up your Supabase credentials to see project data.");
      return [];
    }
    throw error;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectDataWithLongDescription | null> {
  try {
    const { getProjectBySlug: fetchProject } = await import('./supabase/queries');
    const project = await fetchProject(slug);

    if (!project) return null;

    // Transform database format to match existing interface
    return {
      ...project,
      longDescription: project.long_description,
      long_description: undefined
    } as ProjectDataWithLongDescription;
  } catch (error) {
    if (error instanceof Error && error.message === "SUPABASE_NOT_CONFIGURED") {
      console.warn("Supabase not configured - returning null for project lookup.");
      return null;
    }
    throw error;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const { getAllProjectSlugs: fetchSlugs } = await import('./supabase/queries');
    return await fetchSlugs();
  } catch (error) {
    if (error instanceof Error && error.message === "SUPABASE_NOT_CONFIGURED") {
      console.warn("Supabase not configured - returning empty slugs array.");
      return [];
    }
    throw error;
  }
}

export async function getProjectsByCategory(category: string): Promise<ProjectData[]> {
  try {
    const { getProjectsByCategory: fetchProjects } = await import('./supabase/queries');
    const projects = await fetchProjects(category);

    // Transform database format to match existing interface
    return projects.map(project => ({
      ...project,
      longDescription: project.long_description,
      long_description: undefined
    })) as ProjectDataWithLongDescription[];
  } catch (error) {
    if (error instanceof Error && error.message === "SUPABASE_NOT_CONFIGURED") {
      console.warn("Supabase not configured - returning empty projects array for category.");
      return [];
    }
    throw error;
  }
}
