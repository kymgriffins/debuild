-- Create profiles table for user roles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full access to profiles" ON profiles FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Create trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    year TEXT NOT NULL,
    location TEXT NOT NULL,
    size TEXT NOT NULL,
    status TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    long_bio TEXT NOT NULL,
    image TEXT NOT NULL,
    credentials TEXT NOT NULL,
    experience TEXT NOT NULL,
    specializations TEXT[] NOT NULL DEFAULT '{}',
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    linkedin TEXT,
    website TEXT,
    education TEXT[] NOT NULL DEFAULT '{}',
    experience_years INTEGER NOT NULL,
    projects_completed INTEGER NOT NULL,
    awards TEXT[] NOT NULL DEFAULT '{}',
    featured_projects JSONB NOT NULL DEFAULT '[]',
    philosophies TEXT[] NOT NULL DEFAULT '{}',
    skills JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    category TEXT NOT NULL,
    price_range TEXT NOT NULL,
    duration TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    deliverables TEXT[] NOT NULL DEFAULT '{}',
    process_steps JSONB NOT NULL DEFAULT '[]',
    testimonials JSONB NOT NULL DEFAULT '[]',
    is_featured BOOLEAN DEFAULT false,
    order_position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    project_type TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    priority TEXT DEFAULT 'medium',
    assigned_to UUID REFERENCES auth.users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{}'
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id),
    author_name TEXT NOT NULL,
    author_image TEXT,
    featured_image TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    service_type TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status TEXT DEFAULT 'scheduled',
    notes TEXT,
    meeting_link TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_projects table (for client portal)
CREATE TABLE IF NOT EXISTS client_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES auth.users(id) NOT NULL,
    project_name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'planning',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    progress_percentage INTEGER DEFAULT 0,
    project_manager_id UUID REFERENCES auth.users(id),
    documents JSONB DEFAULT '[]',
    timeline JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_updates table (for client communications)
CREATE TABLE IF NOT EXISTS project_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    update_type TEXT DEFAULT 'general',
    is_public BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for blog_posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for appointments" ON appointments FOR SELECT USING (auth.uid() = created_by);

-- Create policies for authenticated users
CREATE POLICY "Authenticated insert for contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated insert for newsletter_subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Create policies for admin users (you'll need to create an admin role)
CREATE POLICY "Admin full access for projects" ON projects FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for team_members" ON team_members FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for services" ON services FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for contact_submissions" ON contact_submissions FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for blog_posts" ON blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for appointments" ON appointments FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for client_projects" ON client_projects FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access for project_updates" ON project_updates FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for clients to access their own projects
CREATE POLICY "Clients read own projects" ON client_projects FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Clients update own projects" ON client_projects FOR UPDATE USING (auth.uid() = client_id);
CREATE POLICY "Clients read project updates" ON project_updates FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM client_projects cp
        WHERE cp.id = project_updates.project_id
        AND cp.client_id = auth.uid()
    )
);

-- Create indexes for better performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_team_members_slug ON team_members(slug);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_client_projects_client_id ON client_projects(client_id);
CREATE INDEX idx_project_updates_project_id ON project_updates(project_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_projects_updated_at BEFORE UPDATE ON client_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
