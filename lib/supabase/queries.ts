import { createClient } from './client';

// Project queries
export async function getAllProjects() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);

      // Check if it's a table not found error
      if (error.message?.includes('relation "public.projects" does not exist')) {
        console.warn('Projects table does not exist. Please run database migrations.');
        console.warn('Visit your Supabase dashboard and run: npx supabase db push');
        console.warn('Or set up the schema manually in the SQL editor.');
      }

      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error in getAllProjects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data;
}

export async function getAllProjectSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('slug');

  if (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }

  return data?.map(item => item.slug) || [];
}

export async function getProjectsByCategory(category: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }

  return data || [];
}

// Team member queries
export async function getAllTeamMembers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('experience_years', { ascending: false });

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data || [];
}

export async function getTeamMemberBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching team member:', error);
    return null;
  }

  return data;
}

export async function getAllTeamMemberSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('slug');

  if (error) {
    console.error('Error fetching team member slugs:', error);
    return [];
  }

  return data?.map(item => item.slug) || [];
}

// Service queries
export async function getAllServices() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_position', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
}

export async function getServiceBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }

  return data;
}

export async function getAllServiceSlugs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .select('slug');

  if (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }

  return data?.map(item => item.slug) || [];
}

export async function getFeaturedServices() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_featured', true)
    .order('order_position', { ascending: true });

  if (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }

  return data || [];
}

export async function getServicesByCategory(category: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('category', category)
    .order('order_position', { ascending: true });

  if (error) {
    console.error('Error fetching services by category:', error);
    return [];
  }

  return data || [];
}

// Contact submission queries
export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }

  return data?.[0];
}

// Newsletter subscription queries
export async function subscribeToNewsletter(email: string, name?: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .upsert(
      { email, name, is_active: true },
      { onConflict: 'email' }
    )
    .select();

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }

  return data?.[0];
}

export async function unsubscribeFromNewsletter(email: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .update({
      is_active: false,
      unsubscribed_at: new Date().toISOString()
    })
    .eq('email', email)
    .select();

  if (error) {
    console.error('Error unsubscribing from newsletter:', error);
    throw error;
  }

  return data?.[0];
}

// Blog post queries
export async function getAllBlogPosts(limit?: number) {
  const supabase = createClient();
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function getBlogPostsByCategory(category: string, limit?: number) {
  const supabase = createClient();
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }

  return data || [];
}

// Appointment queries
export async function createAppointment(appointmentData: {
  client_name: string;
  client_email: string;
  client_phone?: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes?: number;
  notes?: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentData])
    .select();

  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }

  return data?.[0];
}

export async function getUserAppointments(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('created_by', userId)
    .order('appointment_date', { ascending: true });

  if (error) {
    console.error('Error fetching user appointments:', error);
    return [];
  }

  return data || [];
}

// Client project queries (for client portal)
export async function getClientProjects(clientId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('client_projects')
    .select(`
      *,
      project_updates (*)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching client projects:', error);
    return [];
  }

  return data || [];
}

export async function getClientProjectById(projectId: string, clientId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('client_projects')
    .select(`
      *,
      project_updates (*)
    `)
    .eq('id', projectId)
    .eq('client_id', clientId)
    .single();

  if (error) {
    console.error('Error fetching client project:', error);
    return null;
  }

  return data;
}

// Admin queries (for content management)
export async function getAllContactSubmissions(status?: string) {
  const supabase = createClient();
  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }

  return data || [];
}

export async function updateContactSubmissionStatus(id: string, status: string, notes?: string) {
  const supabase = createClient();
  const updateData: any = { status };
  if (notes) updateData.notes = notes;

  const { data, error } = await supabase
    .from('contact_submissions')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating contact submission:', error);
    throw error;
  }

  return data?.[0];
}
