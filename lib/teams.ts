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
    bio: "With over 15 years of experience in architectural design, Judy leads our creative vision and ensures every project meets the highest standards of innovation and sustainability.",
    longBio: "Judy Chesire stands at the forefront of architectural excellence, bringing over 15 years of distinguished experience to every project she undertakes. Her journey in architecture began with a passion for sustainable design and social responsibility, leading her to establish innovative practices that harmonize human needs with environmental stewardship. As Principal Architect, Judy oversees the creative direction of all projects, ensuring that each design not only meets functional requirements but also contributes positively to its community and environment. Her expertise spans residential, commercial, and institutional architecture, with particular emphasis on sustainable building practices and culturally sensitive design. Judy's leadership has been instrumental in securing numerous awards and recognitions for the firm, including LEED certifications and design excellence awards. She holds multiple professional accreditations including LEED AP and AIA membership, and serves as a mentor to emerging architects in the region. When not designing spaces that transform lives, Judy enjoys hiking, reading about architectural history, and volunteering with community development projects.",
    image: "/mockdata/team/Judy Chesire.jpg",
    credentials: "LEED AP, AIA",
    experience: "15+ years",
    specializations: ["Sustainable Design", "Commercial Architecture", "Urban Planning", "Cultural Preservation"],
    email: "judy@outlinedesignsltd.com",
    phone: "+254 700 000 001",
    linkedin: "https://www.linkedin.com/in/judy-chesire-123456789",
    education: [
      "Master of Architecture, University of Nairobi (2009)",
      "Bachelor of Environmental Design, Kenyatta University (2007)",
      "LEED Accredited Professional (2015)"
    ],
    experience_years: 15,
    projects_completed: 45,
    awards: [
      "AIA Design Excellence Award 2024",
      "LEED Platinum Certification - Green Building Council",
      "East Africa Architectural Excellence Award 2023",
      "Sustainable Design Innovator Award 2022"
    ],
    featured_projects: [
      {
        title: "Nairobi Sustainable Office Complex",
        description: "A zero-energy commercial building featuring innovative green technologies and biophilic design principles.",
        image: "/mockdata/ruiru/Renders/ruiru-render-1.jpg",
        year: "2024"
      },
      {
        title: "Cultural Heritage Center",
        description: "Preservation and adaptive reuse of traditional architectural elements in modern healthcare facility.",
        image: "/mockdata/Nyeri/001.png",
        year: "2023"
      },
      {
        title: "Urban Residential Development",
        description: "Mixed-use development combining affordable housing with community spaces and sustainable infrastructure.",
        image: "/mockdata/ruiru/Construction/ruiru-construction-1.jpg",
        year: "2023"
      }
    ],
    philosophies: [
      "Architecture should serve people and planet equally",
      "Design excellence requires understanding cultural context",
      "Sustainability is not a trend, it's a responsibility",
      "Every space has the power to improve lives",
      "Innovation comes from listening to community needs"
    ],
    skills: [
      {
        category: "Technical Skills",
        skills: ["AutoCAD", "Revit", "SketchUp", "Photoshop", "Sustainable Design Software"]
      },
      {
        category: "Certifications",
        skills: ["LEED AP", "AIA Member", "Passive House Designer", "BREEAM Assessor"]
      },
      {
        category: "Specializations",
        skills: ["Sustainable Architecture", "Cultural Preservation", "Urban Planning", "Healthcare Facilities"]
      }
    ]
  },
  "kevin-yegon": {
    id: 2,
    name: "Kevin Yegon",
    slug: "kevin-yegon",
    role: "Design Director",
    bio: "Kevin specializes in creating functional yet beautiful spaces that blend modern aesthetics with practical design. His expertise in 3D visualization brings projects to life before construction begins.",
    longBio: "Kevin Yegon is our master of spatial visualization and human-centered design. With 12 years of experience in architectural design and visualization, Kevin has developed a unique ability to translate complex concepts into compelling visual narratives that inspire clients and stakeholders alike. His journey began with traditional drafting but quickly evolved into cutting-edge digital visualization techniques. As Design Director, Kevin leads our digital design team, overseeing the creation of photorealistic renderings, virtual reality walkthroughs, and interactive presentations that help clients experience their future spaces before construction begins. His work spans residential, commercial, and hospitality projects, with particular expertise in hospitality design and luxury residential developments. Kevin's visualization work has been featured in numerous architectural publications and has played a key role in securing major commissions for the firm. He holds advanced certifications in multiple design software platforms and frequently speaks at industry conferences about the future of digital design in architecture. Beyond his professional work, Kevin is an avid photographer and enjoys exploring Kenya's natural landscapes, often drawing inspiration from the country's diverse geography and wildlife.",
    image: "/mockdata/team/Kevin Yegon.png",
    credentials: "M.Arch, NCARB",
    experience: "12+ years",
    specializations: ["Interior Design", "3D Visualization", "Residential Architecture", "Hospitality Design"],
    email: "kevin@outlinedesignsltd.com",
    phone: "+254 700 000 002",
    linkedin: "https://www.linkedin.com/in/kevin-yegon-987654321",
    education: [
      "Master of Architecture with Specialization in Digital Design, University of Pretoria (2012)",
      "Bachelor of Architecture, Strathmore University (2010)",
      "Certified 3D Visualization Professional (2015)"
    ],
    experience_years: 12,
    projects_completed: 38,
    awards: [
      "Digital Design Innovation Award 2024",
      "Best 3D Visualization - East Africa 2023",
      "Hospitality Design Excellence Award 2022",
      "Young Architect of the Year 2021"
    ],
    featured_projects: [
      {
        title: "Luxury Boutique Hotel",
        description: "Design and visualization of a premium hospitality experience blending modern luxury with local cultural elements.",
        image: "/mockdata/ruiru/Renders/ruiru-render-2.jpg",
        year: "2024"
      },
      {
        title: "Modern Villa Complex",
        description: "Contemporary residential development with focus on interior design and lifestyle integration.",
        image: "/mockdata/Kijabe/002.png",
        year: "2023"
      },
      {
        title: "Urban Lifestyle Center",
        description: "Mixed-use development combining retail, residential, and entertainment spaces with innovative design.",
        image: "/mockdata/ruiru/Construction/ruiru-construction-2.jpg",
        year: "2024"
      }
    ],
    philosophies: [
      "Design should tell a story that resonates emotionally",
      "Technology serves creativity, not the other way around",
      "Every detail matters in creating memorable experiences",
      "Good design is invisible until it delights",
      "Visualization bridges imagination and reality"
    ],
    skills: [
      {
        category: "Technical Skills",
        skills: ["3ds Max", "V-Ray", "Enscape", "Twinmotion", "Lumion", "Unreal Engine"]
      },
      {
        category: "Design Skills",
        skills: ["Interior Architecture", "Space Planning", "Lighting Design", "Material Selection"]
      },
      {
        category: "Software Proficiency",
        skills: ["AutoCAD", "Revit", "SketchUp", "Photoshop", "Illustrator"]
      }
    ]
  },
  "kimwetich-weldon": {
    id: 3,
    name: "Kimwetich Weldon",
    slug: "kimwetich-weldon",
    role: "Project Manager",
    bio: "Kimwetich ensures seamless project execution from concept to completion. His expertise in project management and client relations guarantees that timelines and budgets are met while exceeding expectations.",
    longBio: "Kimwetich Weldon is the orchestrator of architectural excellence, ensuring that visionary designs become tangible realities. With 10 years of experience in project management within the architectural and construction industry, Kimwetich has developed a comprehensive approach to project delivery that balances creative vision with practical execution. His career began in construction management before transitioning to architectural project coordination, where he discovered his passion for bridging the gap between design intent and construction reality. As Project Manager, Kimwetich oversees all project phases from initial planning through construction completion, managing multi-disciplinary teams, coordinating with contractors, and maintaining clear communication with clients throughout the process. His expertise includes budget management, schedule optimization, risk assessment, and regulatory compliance. Kimwetich holds PMP certification and has successfully delivered projects ranging from residential developments to complex institutional buildings. His client-focused approach has earned him numerous commendations and repeat business from satisfied clients. Beyond his professional achievements, Kimwetich is committed to mentorship and knowledge sharing within the architectural community, regularly hosting workshops on project management best practices.",
    image: "/mockdata/team/Kimwetich Weldon.png",
    credentials: "PMP, LEED AP",
    experience: "10+ years",
    specializations: ["Project Management", "Client Relations", "Construction Oversight", "Regulatory Compliance"],
    email: "kimwetich@outlinedesignsltd.com",
    phone: "+254 700 000 003",
    linkedin: "https://www.linkedin.com/in/kimwetich-weldon-456789012",
    education: [
      "MBA with Construction Management Focus, University of Nairobi (2018)",
      "Bachelor of Quantity Surveying, Jomo Kenyatta University (2014)",
      "Project Management Professional (PMP) Certification (2020)",
      "LEED Accredited Professional (2021)"
    ],
    experience_years: 10,
    projects_completed: 32,
    awards: [
      "Project Management Excellence Award 2024",
      "Client Satisfaction Champion 2023",
      "Construction Coordination Award 2022",
      "Leadership in Project Delivery 2021"
    ],
    featured_projects: [
      {
        title: "Medical Center Expansion",
        description: "Managed the expansion of a regional medical facility, ensuring compliance with healthcare standards and minimal disruption to operations.",
        image: "/mockdata/Kijabe/001.png",
        year: "2024"
      },
      {
        title: "Commercial Office Complex",
        description: "Coordinated the development of a modern office complex, managing stakeholder expectations and delivery timelines.",
        image: "/mockdata/ruiru/Renders/ruiru-render-3.jpg",
        year: "2023"
      },
      {
        title: "Educational Facility",
        description: "Oversaw construction of a contemporary learning environment, focusing on functionality and future adaptability.",
        image: "/mockdata/Nyeri/002.png",
        year: "2023"
      }
    ],
    philosophies: [
      "Success is measured by client satisfaction, not just project completion",
      "Every challenge presents an opportunity for innovation",
      "Clear communication prevents 90% of project problems",
      "Quality comes from attention to detail, not shortcuts",
      "Team collaboration creates extraordinary results"
    ],
    skills: [
      {
        category: "Management Skills",
        skills: ["Budget Management", "Schedule Planning", "Risk Assessment", "Team Leadership"]
      },
      {
        category: "Technical Skills",
        skills: ["Construction Documentation", "Contract Management", "Quality Control", "Regulatory Compliance"]
      },
      {
        category: "Tools & Software",
        skills: ["Microsoft Project", "Primavera", "Procore", "Asana", "Slack"]
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
