export interface TeamMemberData {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio: string;
  longBio: string;
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
}

// Team member detailed data based on their expertise and contributions
export const teamMembers: Record<string, TeamMemberData> = {
  "judy-chesire": {
    id: 1,
    name: "Judy Chesire",
    slug: "judy-chesire",
    role: "Principal Architect",
    bio: "Architect specializing in context-driven design, sustainability, and human-centered spatial planning.",
    longBio:
      "Judy is an architect driven by the belief that well-considered design improves how people live, work, and interact with space. She graduated with a Bachelor of Architecture from the Technical University of Mombasa in 2022. Since then, she has worked across residential, commercial, and small institutional projects, focusing on sustainable building strategies and community-minded architecture. Her approach combines research, material sensitivity, and client collaboration to develop solutions that are functional, enduring, and culturally aligned. Judy’s contributions have shaped the studio’s design philosophy, and she has been a key part of the successful delivery of more than 21 built and ongoing projects.",
    image: "/mockdata/team/Judy Chesire.jpg",
    credentials: "B.Arch",
    experience: "3 years",
    specializations: [
      "Sustainable Architecture",
      "Residential Design",
      "Contextual Design",
      "Material Research"
    ],
    email: "judy@outlinedesignsltd.com",
    phone: "+254700000001",
    linkedin: "https://www.linkedin.com/in/judy-chesire",
    education: [
      "Bachelor of Architecture, Technical University of Mombasa (2022)"
    ],
    experience_years: 3,
    projects_completed: 21,
    awards: [],
    featured_projects: [
      {
        title: "Ruiru Courtyard Residence",
        description:
          "A climate-sensitive family residence designed around natural ventilation and daylighting.",
        image: "/mockdata/ruiru/Renders/ruiru-render-1.jpg",
        year: "2024"
      },
      {
        title: "Nyeri Compact Housing Units",
        description:
          "Affordable housing concept focusing on modularity and efficient land use.",
        image: "/mockdata/Nyeri/001.png",
        year: "2023"
      },
      {
        title: "Mixed-Use Community Block",
        description:
          "A small-scale commercial and residential hybrid integrating local materials and passive cooling.",
        image: "/mockdata/ruiru/Construction/ruiru-construction-1.jpg",
        year: "2023"
      }
    ],
    philosophies: [
      "Design must respond to people before aesthetics.",
      "Sustainability is achieved through simplicity and intention.",
      "Architecture should reflect place, climate, and culture."
    ],
    skills: [
      {
        category: "Technical Skills",
        skills: ["AutoCAD", "Revit", "SketchUp", "Archicad", "Adobe Suite"]
      },
      {
        category: "Specializations",
        skills: [
          "Sustainable Design",
          "Concept Development",
          "Material Selection",
          "Environmental Modeling"
        ]
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────

  "kevin-yegon": {
    id: 2,
    name: "Kevin Yegon",
    slug: "kevin-yegon",
    role: "Design Director & Lead Visualizer",
    bio: "Architect and visualization specialist focused on translating ideas into expressive visual narratives.",
    longBio:
      "Kevin graduated with a Bachelor of Architecture from the Technical University of Mombasa in 2023. He leads visualization and spatial design, bringing concepts to life through precise drawings, 3D modeling, rendering, and digital simulations. His strengths lie in interior detailing, visual storytelling, and translating user needs into thoughtful spatial arrangements. Kevin ensures that each project is clearly communicated to clients through immersive visual outputs, playing a central role in the delivery of more than 21 collective studio projects.",
    image: "/mockdata/team/Kevin Yegon.png",
    credentials: "B.Arch",
    experience: "2 years",
    specializations: [
      "3D Visualization",
      "Interior Architecture",
      "Rendering & Animation",
      "Residential Design"
    ],
    email: "kevin@outlinedesignsltd.com",
    phone: "+254700000002",
    linkedin: "https://www.linkedin.com/in/kevin-yegon",
    education: [
      "Bachelor of Architecture, Technical University of Mombasa (2023)"
    ],
    experience_years: 2,
    projects_completed: 21,
    awards: [],
    featured_projects: [
      {
        title: "Luxury Villa Concept – Kijabe",
        description:
          "Full visualization package including lighting studies and interior detailing.",
        image: "/mockdata/Kijabe/002.png",
        year: "2023"
      },
      {
        title: "Ruiru Mixed-Use Block",
        description:
          "Design development and rendering for a compact mixed-use development.",
        image: "/mockdata/ruiru/Renders/ruiru-render-2.jpg",
        year: "2024"
      },
      {
        title: "Urban Loft Interiors",
        description:
          "Interior and lighting visualization for a contemporary loft-style residential unit.",
        image: "/mockdata/ruiru/Construction/ruiru-construction-2.jpg",
        year: "2024"
      }
    ],
    philosophies: [
      "Every space should feel intentional.",
      "Visualization helps clients see possibilities, not just drawings.",
      "Design is a balance of creativity, clarity, and precision."
    ],
    skills: [
      {
        category: "Technical Skills",
        skills: ["3ds Max", "V-Ray", "Enscape", "Lumion", "Twinmotion"]
      },
      {
        category: "Design Skills",
        skills: ["Interior Planning", "Material Selection", "Lighting Simulation"]
      },
      {
        category: "Software",
        skills: ["AutoCAD", "Revit", "Photoshop", "Illustrator"]
      }
    ]
  },

  // ───────────────────────────────────────────────────────────────

  "kimwetich-weldon": {
    id: 3,
    name: "Kimwetich Weldon",
    slug: "kimwetich-weldon",
    role: "Project Manager & Architect",
    bio: "Architect overseeing project coordination, client communication, timelines, and execution.",
    longBio:
      "Weldon graduated with a Bachelor of Architecture from Kenyatta University in 2022 and is currently pursuing a Master's degree. His role blends architectural design with project management, ensuring that concepts progress efficiently from drawings to site. Weldon coordinates consultants, manages client expectations, prepares documentation, and leads site follow-ups. His structured approach and attention to detail have helped the team successfully deliver over 21 collaborative projects. His ongoing postgraduate studies strengthen his technical, managerial, and research capabilities.",
    image: "/mockdata/team/Kimwetich Weldon.png",
    credentials: "B.Arch, M.Arch (ongoing)",
    experience: "3 years",
    specializations: [
      "Project Management",
      "Client Relations",
      "Construction Coordination",
      "Regulatory Documentation"
    ],
    email: "kimwetich@outlinedesignsltd.com",
    phone: "+254700000003",
    linkedin: "https://www.linkedin.com/in/kimwetich-weldon",
    education: [
      "Bachelor of Architecture, Kenyatta University (2022)",
      "Master of Architecture (Ongoing), Kenyatta University (2024– )"
    ],
    experience_years: 3,
    projects_completed: 21,
    awards: [],
    featured_projects: [
      {
        title: "Kijabe Hillside Residence",
        description:
          "Construction supervision and coordination for a contemporary hillside residence.",
        image: "/mockdata/Kijabe/001.png",
        year: "2024"
      },
      {
        title: "Ruiru Commercial Complex",
        description:
          "Led documentation and contractor coordination for a mixed-use commercial development.",
        image: "/mockdata/ruiru/Renders/ruiru-render-3.jpg",
        year: "2023"
      },
      {
        title: "Nyeri Learning Studio",
        description:
          "Project coordination for a compact educational facility focused on adaptability.",
        image: "/mockdata/Nyeri/002.png",
        year: "2023"
      }
    ],
    philosophies: [
      "Good management ensures good design is delivered well.",
      "Communication eliminates most project risks.",
      "Coordination is the bridge between vision and construction reality."
    ],
    skills: [
      {
        category: "Management Skills",
        skills: ["Scheduling", "Documentation", "Client Communication", "Team Coordination"]
      },
      {
        category: "Technical Skills",
        skills: ["Site Supervision", "Regulatory Compliance", "Technical Drawings"]
      },
      {
        category: "Tools",
        skills: ["Microsoft Project", "Procore", "AutoCAD", "Revit"]
      }
    ]
  }
};

// Helper functions
export function getAllTeamMembers(): TeamMemberData[] {
  return Object.values(teamMembers);
}

export function getTeamMemberBySlug(slug: string): TeamMemberData | undefined {
  return teamMembers[slug];
}

export function getAllTeamMemberSlugs(): string[] {
  return Object.keys(teamMembers);
}
