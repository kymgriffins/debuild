-- Combined setup script for remote Supabase instance
-- This script sets up the database schema and seeds initial data
-- Run this in your Supabase dashboard SQL editor

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

-- Seed projects data
INSERT INTO projects (title, slug, category, description, long_description, images, year, location, size, status, features) VALUES
(
    'Kijabe Medical Center Expansion',
    'kijabe',
    'Healthcare',
    'Modern healthcare facility expansion combining architectural excellence with medical innovation to serve rural communities.',
    'The Kijabe Medical Center expansion represents a transformative approach to healthcare architecture in rural Kenya. This state-of-the-art facility seamlessly integrates modern medical technology with culturally sensitive design, ensuring that patients from diverse backgrounds feel welcomed and cared for. The expansion includes advanced surgical suites, diagnostic imaging centers, and patient wards designed with natural light and healing environments that promote faster recovery. Local materials and traditional Kenyan architectural elements blend harmoniously with contemporary medical requirements, creating a healthcare space that respects local culture while meeting international standards.',
    ARRAY[
        '/mockdata/Kijabe/optimized/001-desktop.jpg',
        '/mockdata/Kijabe/optimized/002-desktop.jpg',
        '/mockdata/Kijabe/optimized/003-desktop.jpg',
        '/mockdata/Kijabe/optimized/004-desktop.jpg',
        '/mockdata/Kijabe/optimized/005-desktop.jpg'
    ],
    '2024',
    'Kijabe, Kenya',
    '45,000 sq ft',
    'Completed',
    ARRAY[
        'Advanced Medical Technology',
        'Culturally Sensitive Design',
        'Natural Healing Environments',
        'Sustainable Building Systems',
        'Community Integration',
        'Traditional Material Integration'
    ]
),
(
    'Ruiru Residential Development',
    'ruiru-construction',
    'Residential',
    'Sustainable residential complex combining modern living spaces with community-focused design for growing urban populations.',
    'The Ruiru Residential Development exemplifies sustainable urban living in one of Nairobi''s fastest-growing suburbs. This mixed-use residential complex offers contemporary apartments and townhouses designed with Kenya''s climate and lifestyle in mind. The development features energy-efficient homes with solar integration, rainwater harvesting systems, and community spaces that foster social connections. Local construction techniques and materials are employed alongside modern building technologies to create affordable, sustainable housing that meets the needs of Kenya''s growing middle class while respecting environmental considerations and community values.',
    ARRAY[
        '/mockdata/ruiru/Construction/optimized/ruiru-construction-1-desktop.jpg',
        '/mockdata/ruiru/Construction/optimized/ruiru-construction-2-desktop.jpg',
        '/mockdata/ruiru/Construction/optimized/ruiru-construction-3-desktop.jpg',
        '/mockdata/ruiru/Construction/optimized/ruiru-construction-4-desktop.jpg'
    ],
    '2024',
    'Ruiru, Kenya',
    '120,000 sq ft',
    'Under Construction',
    ARRAY[
        'Sustainable Housing',
        'Solar Integration',
        'Rainwater Harvesting',
        'Community Spaces',
        'Energy Efficiency',
        'Mixed-Use Development'
    ]
),
(
    'Ruiru Commercial Complex',
    'ruiru-renders',
    'Commercial',
    'Contemporary commercial space designed to serve as a hub for business and community activities in Ruiru''s growing commercial district.',
    'The Ruiru Commercial Complex represents a vision for modern commercial architecture that serves both business and community needs. This multi-story development features flexible retail spaces, office suites, and community gathering areas designed to accommodate Kenya''s dynamic entrepreneurial landscape. The architectural design incorporates passive cooling techniques, natural ventilation, and energy-efficient systems that are essential in Nairobi''s equatorial climate. The building serves as more than just a commercial space—it becomes a community hub where business, culture, and social interaction converge, supporting local economic growth while maintaining architectural excellence and sustainable design principles.',
    ARRAY[
        '/mockdata/ruiru/Renders/optimized/ruiru-render-1-desktop.jpg',
        '/mockdata/ruiru/Renders/optimized/ruiru-render-2-desktop.jpg',
        '/mockdata/ruiru/Renders/optimized/ruiru-render-3-desktop.jpg',
        '/mockdata/ruiru/Renders/optimized/ruiru-render-4-desktop.jpg'
    ],
    '2024',
    'Ruiru, Kenya',
    '85,000 sq ft',
    'Planning',
    ARRAY[
        'Modern Commercial Spaces',
        'Flexible Office Suites',
        'Community Integration',
        'Passive Cooling Design',
        'Energy-Efficient Systems',
        'Economic Development Focus'
    ]
),
(
    'Nyeri Cultural Heritage Center',
    'nyeri',
    'Cultural',
    'Cultural preservation center that bridges traditional Kenyan heritage with contemporary architectural expression.',
    'The Nyeri Cultural Heritage Center stands as a testament to Kenya''s rich cultural history while embracing modern architectural innovation. This center serves as both a museum and community space, showcasing traditional Kikuyu cultural artifacts, performing arts, and historical exhibits. The design thoughtfully incorporates elements of traditional Kikuyu architecture—organic forms, natural materials, and symbolic patterns—while providing state-of-the-art facilities for cultural preservation and education. The center features interactive galleries, performance spaces, and outdoor areas that connect visitors with Nyeri''s cultural heritage while fostering community engagement and cultural education for future generations.',
    ARRAY[
        '/mockdata/Nyeri/optimized/001-desktop.jpg',
        '/mockdata/Nyeri/optimized/002-desktop.jpg',
        '/mockdata/Nyeri/optimized/003-desktop.jpg',
        '/mockdata/Nyeri/optimized/004-desktop.jpg'
    ],
    '2023',
    'Nyeri, Kenya',
    '35,000 sq ft',
    'Completed',
    ARRAY[
        'Cultural Preservation',
        'Traditional Architecture',
        'Interactive Galleries',
        'Community Education',
        'Performance Spaces',
        'Cultural Heritage'
    ]
),
(
    'Nairobi Modern Office Complex',
    'nairobi-office-complex',
    'Commercial',
    'Contemporary office complex designed for modern businesses with sustainable features and flexible workspaces.',
    'The Nairobi Modern Office Complex represents the future of commercial architecture in East Africa. This 15-story office tower combines cutting-edge design with sustainable building practices, creating an environment that enhances productivity and well-being. The building features open-plan offices, collaborative spaces, green terraces, and smart building technology that optimizes energy use and indoor air quality. The design incorporates Kenyan architectural elements while meeting international standards for modern office environments.',
    ARRAY[
        '/mockdata/renders/001.jpeg',
        '/mockdata/renders/002.jpeg',
        '/mockdata/renders/003.jpeg'
    ],
    '2024',
    'Nairobi, Kenya',
    '150,000 sq ft',
    'Planning',
    ARRAY[
        'Smart Building Technology',
        'Green Building Design',
        'Flexible Workspace Solutions',
        'Energy-Efficient Systems',
        'Modern Kenyan Architecture',
        'Sustainable Construction'
    ]
);

-- Seed team members data
INSERT INTO team_members (name, slug, role, bio, long_bio, image, credentials, experience, specializations, email, phone, linkedin, education, experience_years, projects_completed, featured_projects, philosophies, skills) VALUES
(
    'Judy Chesire',
    'judy-chesire',
    'Principal Architect',
    'Architect specializing in context-driven design, sustainability, and human-centered spatial planning.',
    'Judy is an architect driven by the belief that well-considered design improves how people live, work, and interact with space. She graduated with a Bachelor of Architecture from the Technical University of Mombasa in 2022. Since then, she has worked across residential, commercial, and small institutional projects, focusing on sustainable building strategies and community-minded architecture. Her approach combines research, material sensitivity, and client collaboration to develop solutions that are functional, enduring, and culturally aligned. Judy''s contributions have shaped the studio''s design philosophy, and she has been a key part of the successful delivery of more than 21 built and ongoing projects.',
    '/mockdata/team/optimized/judy-chesire-hero.jpg',
    'B.Arch',
    '5 years',
    ARRAY[
        'Sustainable Architecture',
        'Residential Design',
        'Contextual Design',
        'Material Research'
    ],
    'judy@outlinedesignsltd.com',
    '+254700000001',
    'https://www.linkedin.com/in/judy-chesire',
    ARRAY[
        'Bachelor of Architecture, Technical University of Mombasa (2022)'
    ],
    5,
    21,
    '[
        {
            "title": "Ruiru Courtyard Residence",
            "description": "A climate-sensitive family residence designed around natural ventilation and daylighting.",
            "image": "/mockdata/ruiru/Renders/ruiru-render-1.jpg",
            "year": "2024"
        },
        {
            "title": "Nyeri Compact Housing Units",
            "description": "Affordable housing concept focusing on modularity and efficient land use.",
            "image": "/mockdata/Nyeri/001.png",
            "year": "2023"
        },
        {
            "title": "Mixed-Use Community Block",
            "description": "A small-scale commercial and residential hybrid integrating local materials and passive cooling.",
            "image": "/mockdata/ruiru/Construction/ruiru-construction-1.jpg",
            "year": "2023"
        }
    ]',
    ARRAY[
        'Design must respond to people before aesthetics.',
        'Sustainability is achieved through simplicity and intention.',
        'Architecture should reflect place, climate, and culture.'
    ],
    '[
        {
            "category": "Technical Skills",
            "skills": ["AutoCAD", "Revit", "SketchUp", "Archicad", "Adobe Suite"]
        },
        {
            "category": "Specializations",
            "skills": ["Sustainable Design", "Concept Development", "Material Selection", "Environmental Modeling"]
        }
    ]'
),
(
    'Kevin Yegon',
    'kevin-yegon',
    'Design Director & Lead Visualizer',
    'Architect and visualization specialist focused on translating ideas into expressive visual narratives.',
    'Kevin graduated with a Bachelor of Architecture from the Technical University of Mombasa in 2023. He leads visualization and spatial design, bringing concepts to life through precise drawings, 3D modeling, rendering, and digital simulations. His strengths lie in interior detailing, visual storytelling, and translating user needs into thoughtful spatial arrangements. Kevin ensures that each project is clearly communicated to clients through immersive visual outputs, playing a central role in the delivery of more than 21 collective studio projects.',
    '/mockdata/team/optimized/kevin-yegon-hero.jpg',
    'B.Arch',
    '5 years',
    ARRAY[
        '3D Visualization',
        'Interior Architecture',
        'Rendering & Animation',
        'Residential Design'
    ],
    'kevin@outlinedesignsltd.com',
    '+254700000002',
    'https://www.linkedin.com/in/kevin-yegon',
    ARRAY[
        'Bachelor of Architecture, Technical University of Mombasa (2023)'
    ],
    5,
    21,
    '[
        {
            "title": "Luxury Villa Concept – Kijabe",
            "description": "Full visualization package including lighting studies and interior detailing.",
            "image": "/mockdata/Kijabe/002.png",
            "year": "2023"
        },
        {
            "title": "Ruiru Mixed-Use Block",
            "description": "Design development and rendering for a compact mixed-use development.",
            "image": "/mockdata/ruiru/Renders/ruiru-render-2.jpg",
            "year": "2024"
        },
        {
            "title": "Urban Loft Interiors",
            "description": "Interior and lighting visualization for a contemporary loft-style residential unit.",
            "image": "/mockdata/ruiru/Construction/ruiru-construction-2.jpg",
            "year": "2024"
        }
    ]',
    ARRAY[
        'Every space should feel intentional.',
        'Visualization helps clients see possibilities, not just drawings.',
        'Design is a balance of creativity, clarity, and precision.'
    ],
    '[
        {
            "category": "Technical Skills",
            "skills": ["3ds Max", "V-Ray", "Enscape", "Lumion", "Twinmotion"]
        },
        {
            "category": "Design Skills",
            "skills": ["Interior Planning", "Material Selection", "Lighting Simulation"]
        },
        {
            "category": "Software",
            "skills": ["AutoCAD", "Revit", "Photoshop", "Illustrator"]
        }
    ]'
),
(
    'Kimwetich Weldon',
    'kimwetich-weldon',
    'Project Manager & Architect',
    'Architect overseeing project coordination, client communication, timelines, and execution.',
    'Weldon graduated with a Bachelor of Architecture from Kenyatta University in 2022 and is currently pursuing a Master''s degree. His role blends architectural design with project management, ensuring that concepts progress efficiently from drawings to site. Weldon coordinates consultants, manages client expectations, prepares documentation, and leads site follow-ups. His structured approach and attention to detail have helped the team successfully deliver over 21 collaborative projects. His ongoing postgraduate studies strengthen his technical, managerial, and research capabilities.',
    '/mockdata/team/optimized/kimwetich-weldon-hero.jpg',
    'B.Arch, M.Arch (ongoing)',
    '6 years',
    ARRAY[
        'Project Management',
        'Client Relations',
        'Construction Coordination',
        'Regulatory Documentation'
    ],
    'kimwetich@outlinedesignsltd.com',
    '+254700000003',
    'https://www.linkedin.com/in/kimwetich-weldon',
    ARRAY[
        'Bachelor of Architecture, Kenyatta University (2022)',
        'Master of Architecture (Ongoing), Kenyatta University (2024– )'
    ],
    6,
    21,
    '[
        {
            "title": "Kijabe Hillside Residence",
            "description": "Construction supervision and coordination for a contemporary hillside residence.",
            "image": "/mockdata/Kijabe/001.png",
            "year": "2024"
        },
        {
            "title": "Ruiru Commercial Complex",
            "description": "Led documentation and contractor coordination for a mixed-use commercial development.",
            "image": "/mockdata/ruiru/Renders/ruiru-render-3.jpg",
            "year": "2023"
        },
        {
            "title": "Nyeri Learning Studio",
            "description": "Project coordination for a compact educational facility focused on adaptability.",
            "image": "/mockdata/Nyeri/002.png",
            "year": "2023"
        }
    ]',
    ARRAY[
        'Good management ensures good design is delivered well.',
        'Communication eliminates most project risks.',
        'Coordination is the bridge between vision and construction reality.'
    ],
    '[
        {
            "category": "Management Skills",
            "skills": ["Scheduling", "Documentation", "Client Communication", "Team Coordination"]
        },
        {
            "category": "Technical Skills",
            "skills": ["Site Supervision", "Regulatory Compliance", "Technical Drawings"]
        },
        {
            "category": "Tools",
            "skills": ["Microsoft Project", "Procore", "AutoCAD", "Revit"]
        }
    ]'
);

-- Seed services data
INSERT INTO services (title, slug, category, description, long_description, price_range, duration, features, deliverables, process_steps, testimonials, is_featured, order_position) VALUES
(
    'Architectural Design',
    'architectural-design',
    'Design Services',
    'Complete architectural design services from concept to construction documents.',
    'Our architectural design service provides comprehensive planning and design solutions tailored to your vision and requirements. We combine creativity with technical expertise to create spaces that are both functional and inspiring.',
    '$5,000 - $50,000',
    '4-12 weeks',
    ARRAY[
        'Concept Development',
        'Site Analysis',
        '3D Visualization',
        'Technical Drawings',
        'Construction Documents',
        'Client Presentations'
    ],
    ARRAY[
        'Preliminary sketches',
        '3D renderings',
        'Working drawings',
        'Specifications',
        'Construction documents'
    ],
    '[
        {"step": "Discovery", "description": "Understanding your vision, requirements, and budget"},
        {"step": "Concept Design", "description": "Developing initial design concepts and options"},
        {"step": "Design Development", "description": "Refining the chosen concept with detailed planning"},
        {"step": "Technical Documentation", "description": "Creating construction-ready drawings and specifications"},
        {"step": "Client Review", "description": "Presenting final designs and incorporating feedback"}
    ]',
    '[]',
    true,
    1
),
(
    'Interior Design',
    'interior-design',
    'Design Services',
    'Transform your space with our expert interior design services.',
    'Our interior design service focuses on creating beautiful, functional spaces that reflect your personality and lifestyle. We handle everything from space planning to material selection.',
    '$3,000 - $25,000',
    '3-8 weeks',
    ARRAY[
        'Space Planning',
        'Color Consultation',
        'Material Selection',
        'Furniture Design',
        'Lighting Design',
        'Custom Finishes'
    ],
    ARRAY[
        'Interior layout plans',
        'Material specifications',
        'Furniture schedules',
        'Lighting plans',
        'Construction drawings'
    ],
    '[
        {"step": "Assessment", "description": "Evaluating the space and understanding your needs"},
        {"step": "Concept Development", "description": "Creating mood boards and initial design concepts"},
        {"step": "Design Refinement", "description": "Developing detailed plans and specifications"},
        {"step": "Procurement", "description": "Assisting with material and furniture sourcing"},
        {"step": "Installation", "description": "Overseeing the implementation of the design"}
    ]',
    '[]',
    true,
    2
),
(
    'Project Management',
    'project-management',
    'Consulting Services',
    'Professional project management to ensure your construction project runs smoothly.',
    'Our project management service ensures your construction project is delivered on time, within budget, and to the highest quality standards. We coordinate all aspects of the construction process.',
    '$2,000 - $10,000/month',
    'Project duration',
    ARRAY[
        'Schedule Management',
        'Budget Control',
        'Quality Assurance',
        'Contractor Coordination',
        'Progress Monitoring',
        'Client Communication'
    ],
    ARRAY[
        'Project schedule',
        'Budget tracking',
        'Progress reports',
        'Quality inspections',
        'Final handover'
    ],
    '[
        {"step": "Planning", "description": "Developing comprehensive project plans and schedules"},
        {"step": "Procurement", "description": "Selecting and contracting qualified professionals"},
        {"step": "Execution", "description": "Overseeing construction and managing subcontractors"},
        {"step": "Monitoring", "description": "Tracking progress and ensuring quality standards"},
        {"step": "Closeout", "description": "Final inspections and project handover"}
    ]',
    '[]',
    true,
    3
),
(
    '3D Visualization',
    '3d-visualization',
    'Digital Services',
    'Bring your designs to life with photorealistic 3D visualizations.',
    'Our 3D visualization service creates stunning, photorealistic renderings that help you visualize your project before construction begins. Perfect for presentations and marketing materials.',
    '$500 - $5,000',
    '1-4 weeks',
    ARRAY[
        'Photorealistic Rendering',
        'Virtual Reality Tours',
        'Animation Services',
        'Material Studies',
        'Lighting Analysis',
        'Presentation Boards'
    ],
    ARRAY[
        'High-resolution images',
        '360° virtual tours',
        'Animation sequences',
        'Presentation materials'
    ],
    '[
        {"step": "Model Creation", "description": "Building detailed 3D models from design drawings"},
        {"step": "Material Application", "description": "Applying realistic materials and textures"},
        {"step": "Lighting Setup", "description": "Setting up appropriate lighting scenarios"},
        {"step": "Rendering", "description": "Generating high-quality final images and animations"}
    ]',
    '[]',
    false,
    4
),
(
    'Sustainable Design Consulting',
    'sustainable-design',
    'Consulting Services',
    'Expert guidance on sustainable and green building practices.',
    'Our sustainable design consulting helps you create environmentally responsible buildings that reduce energy consumption and minimize environmental impact while maintaining comfort and functionality.',
    '$1,500 - $8,000',
    '2-6 weeks',
    ARRAY[
        'Energy Analysis',
        'Material Assessment',
        'LEED Certification Support',
        'Green Technology Integration',
        'Cost-Benefit Analysis',
        'Sustainability Planning'
    ],
    ARRAY[
        'Sustainability report',
        'Energy modeling',
        'Material recommendations',
        'Certification strategy'
    ],
    '[
        {"step": "Assessment", "description": "Evaluating current environmental impact and opportunities"},
        {"step": "Strategy Development", "description": "Creating sustainable design strategies and goals"},
        {"step": "Implementation Planning", "description": "Developing detailed implementation plans"},
        {"step": "Monitoring Framework", "description": "Establishing systems for tracking sustainability metrics"}
    ]',
    '[]',
    false,
    5
);



