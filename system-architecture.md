# System Architecture: DeBuild - Architectural Firm Management Platform

## Overview
DeBuild is a comprehensive web platform that combines an architectural firm's public marketing website with an internal project management system. The platform serves dual audiences: external clients browsing the portfolio website and internal team members managing construction projects.

## Core Architecture Principles

### 1. **Full-Stack TypeScript Monolith**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enforcement
- **Architecture**: Component-based monolith with clear separation of concerns
- **Rationale**: Single codebase reduces deployment complexity and enables shared business logic

### 2. **Progressive Enhancement & Mobile-First**
- **Design Philosophy**: Mobile-first responsive design with progressive enhancement
- **Accessibility**: WCAG 2.1 AA compliance standard
- **Performance**: Core Web Vitals optimization (<1500ms LCP, <100ms FID, <0.1 CLS)

## Technology Stack

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                │
├─────────────────────────────────────────────────────────┤
│  Pages (SSR/SSG) │ Components │ Motion │ Authentication │
├─────────────────────────────────────────────────────────┤
│     Shadcn/ui      │ Framer Motion │  Supabase Auth    │
├─────────────────────────────────────────────────────────┤
│            Tailwind CSS v4.1 + PostCSS                 │
└─────────────────────────────────────────────────────────┘
```

### Key Technologies
- **React 19**: Latest features with concurrent rendering
- **TypeScript 5**: Strict type checking and advanced type features
- **Tailwind CSS 4.1**: Utility-first styling with custom design system
- **Framer Motion**: High-performance animations and transitions
- **Radix UI**: Accessible component primitives via shadcn/ui
- **Supabase**: Backend-as-a-Service for authentication and data management

## System Components

### 1. Public Website Layer (Client-Facing)
**Purpose**: Marketing and portfolio showcase for potential clients
**Features**:
- Responsive landing page with architectural showcase
- Project portfolio with image galleries
- Company philosophy and team presentation
- Contact forms and service information

**Architecture Patterns**:
- Static generation for performance
- Image optimization and lazy loading
- SEO-optimized meta tags and structured data
- Progressive Web App capabilities

### 2. Authentication & Security Layer
**Technology**: Supabase Auth with custom middleware
**Features**:
- Cookie-based session management
- Server-side rendering compatible
- Protected routes for internal tools
- Password reset and email verification

**Security Measures**:
- HTTPS-only communication
- CSRF protection
- Secure cookie configuration
- Input validation and sanitization

### 3. Project Management Dashboard (Internal)
**Purpose**: Comprehensive project tracking and team collaboration
**Components**:
- Financial tracking with budget allocation
- Project timelines and milestone management
- Team member profiles and assignments
- Document and image management

**Data Architecture**:
```typescript
// Type-safe data models with strict validation
interface ProjectWithRelations {
  id: string;
  title: string;
  client: Client;
  financials: FinancialData[];
  milestones: Milestone[];
  team: TeamMember[];
  status: ProjectStatus;
  created_at: Date;
  updated_at: Date;
}
```

## Database Schema Design

### Core Entities
```sql
-- Projects table (main entity)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  status project_status NOT NULL,
  category project_category NOT NULL,
  location TEXT,
  size TEXT,
  year INTEGER,
  budget DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial tracking
CREATE TABLE project_financials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  category TEXT NOT NULL,
  allocated DECIMAL(10,2),
  spent DECIMAL(10,2),
  date DATE NOT NULL
);

-- Project milestones
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  completed_date DATE,
  status milestone_status DEFAULT 'pending',
  deliverables JSONB
);

-- Team management
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT UNIQUE,
  specialization TEXT[],
  avatar_url TEXT,
  bio TEXT
);

-- Client relationships
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  company TEXT,
  project_ids UUID[]
);
```

## Application Architecture Patterns

### 1. Component Architecture
```
// Hierarchical component structure
src/
├── components/
│   ├── ui/           # Reusable design system components
│   ├── sections/     # Page section components
│   ├── motion/       # Animation wrapper components
│   ├── layout/       # Layout and navigation components
│   └── auth/         # Authentication components
├── app/              # Next.js app router pages
└── lib/              # Utilities and business logic
```

### 2. State Management Strategy
- **Local State**: React hooks for component-level state
- **Server State**: Supabase for remote data fetching
- **Global State**: Context API for theme and authentication
- **Form State**: React Hook Form with Zod validation

### 3. Data Fetching Patterns
```typescript
// Server components for initial page loads
export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectGrid projects={projects} />;
}

// Client components for interactive features
'use client';
export function ProjectFilters() {
  const [filters, setFilters] = useState<Filters>({});
  const { data: projects } = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => fetchFilteredProjects(filters)
  });
}
```

## Performance Architecture

### Core Web Vitals Strategy
```
Lighthouse Performance Targets:
├── First Contentful Paint (FCP): <1800ms
├── Largest Contentful Paint (LCP): <2500ms
├── First Input Delay (FID): <100ms
├── Cumulative Layout Shift (CLS): <0.1
└── Speed Index: <3000ms
```

### Optimization Techniques
- **Image Optimization**: Next.js Image component with WebP/AVIF formats
- **Bundle Splitting**: Dynamic imports for large components
- **Caching Strategy**: ISR for static content, SSR for dynamic data
- **Code Splitting**: Route-based and component-based chunking

## Security Architecture

### Authentication Flow
```
1. User Authentication
   ├── Email/Password login
   ├── Password reset flow
   └── Session management

2. Authorization
   ├── Role-based access control
   ├── Route protection middleware
   └── API endpoint authorization
```

### Data Protection
- **Transport Security**: HTTPS everywhere
- **Data Encryption**: Client-side encryption for sensitive data
- **Input Validation**: Zod schemas for runtime type safety
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: Content Security Policy headers

## Deployment Architecture

### Environment Strategy
```
Development → Staging → Production
├── Feature branches (dev)
├── Release branches (staging)
└── Main branch (production)
```

### Infrastructure
- **Hosting**: Vercel for frontend and serverless functions
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage for assets
- **CDN**: Vercel Edge Network for global distribution

### Monitoring & Analytics
- **Performance**: Vercel Analytics and Lighthouse CI
- **Error Tracking**: Sentry integration
- **User Analytics**: Privacy-focused analytics
- **Uptime Monitoring**: Vercel status monitoring

## Scalability Considerations

### Vertical Scaling
- Component-level code splitting
- Image optimization and lazy loading
- Database query optimization
- Efficient React rendering patterns

### Horizontal Scaling
- Statically generated marketing pages
- Server-side rendering for authenticated pages
- CDN for asset delivery
- Database connection pooling

## Development Workflow

### Code Quality Gates
```
Pre-commit hooks:
├── ESLint (code quality)
├── TypeScript compiler (type checking)
├── Prettier (code formatting)
└── Jest (unit tests)

CI/CD Pipeline:
├── Build verification
├── Automated testing
├── Performance budget checks
├── Accessibility testing
└── Security scanning
```

### Development Tools
- **Package Management**: npm/pnpm for dependency management
- **Type Checking**: TypeScript strict mode
- **Code Quality**: ESLint with custom rules
- **Testing**: Jest + React Testing Library
- **Styling**: Tailwind CSS with custom utilities
- **Version Control**: Git with conventional commits

This architecture provides a solid foundation for both the public marketing website and the internal project management system, with room for growth and feature additions while maintaining performance, security, and developer experience.
