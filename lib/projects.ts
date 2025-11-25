// Project data based on actual mockdata folders

export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  year: string;
  location: string;
  size: string;
  status: string;
  features: string[];
}

// Mock project data based on available mockdata directories
export const projects: Record<string, ProjectData> = {
  "kijabe": {
    id: 1,
    title: "Kijabe Medical Center Expansion",
    slug: "kijabe",
    category: "Healthcare",
    description: "Modern healthcare facility expansion combining architectural excellence with medical innovation to serve rural communities.",
    longDescription: "The Kijabe Medical Center expansion represents a transformative approach to healthcare architecture in rural Kenya. This state-of-the-art facility seamlessly integrates modern medical technology with culturally sensitive design, ensuring that patients from diverse backgrounds feel welcomed and cared for. The expansion includes advanced surgical suites, diagnostic imaging centers, and patient wards designed with natural light and healing environments that promote faster recovery. Local materials and traditional Kenyan architectural elements blend harmoniously with contemporary medical requirements, creating a healthcare space that respects local culture while meeting international standards.",
    images: [
      "/mockdata/Kijabe/optimized/001-desktop.jpg",
      "/mockdata/Kijabe/optimized/002-desktop.jpg",
      "/mockdata/Kijabe/optimized/003-desktop.jpg",
      "/mockdata/Kijabe/optimized/004-desktop.jpg",
      "/mockdata/Kijabe/optimized/005-desktop.jpg",
    ],
    year: "2024",
    location: "Kijabe, Kenya",
    size: "45,000 sq ft",
    status: "Completed",
    features: [
      "Advanced Medical Technology",
      "Culturally Sensitive Design",
      "Natural Healing Environments",
      "Sustainable Building Systems",
      "Community Integration",
      "Traditional Material Integration"
    ]
  },
  "ruiru-construction": {
    id: 2,
    title: "Ruiru Residential Development",
    slug: "ruiru-construction",
    category: "Residential",
    description: "Sustainable residential complex combining modern living spaces with community-focused design for growing urban populations.",
    longDescription: "The Ruiru Residential Development exemplifies sustainable urban living in one of Nairobi's fastest-growing suburbs. This mixed-use residential complex offers contemporary apartments and townhouses designed with Kenya's climate and lifestyle in mind. The development features energy-efficient homes with solar integration, rainwater harvesting systems, and community spaces that foster social connections. Local construction techniques and materials are employed alongside modern building technologies to create affordable, sustainable housing that meets the needs of Kenya's growing middle class while respecting environmental considerations and community values.",
    images: [
      "/mockdata/ruiru/Construction/optimized/ruiru-construction-1-desktop.jpg",
      "/mockdata/ruiru/Construction/optimized/ruiru-construction-2-desktop.jpg",
      "/mockdata/ruiru/Construction/optimized/ruiru-construction-3-desktop.jpg",
      "/mockdata/ruiru/Construction/optimized/ruiru-construction-4-desktop.jpg"
    ],
    year: "2024",
    location: "Ruiru, Kenya",
    size: "120,000 sq ft",
    status: "Under Construction",
    features: [
      "Sustainable Housing",
      "Solar Integration",
      "Rainwater Harvesting",
      "Community Spaces",
      "Energy Efficiency",
      "Mixed-Use Development"
    ]
  },
  "ruiru-renders": {
    id: 3,
    title: "Ruiru Commercial Complex",
    slug: "ruiru-renders",
    category: "Commercial",
    description: "Contemporary commercial space designed to serve as a hub for business and community activities in Ruiru's growing commercial district.",
    longDescription: "The Ruiru Commercial Complex represents a vision for modern commercial architecture that serves both business and community needs. This multi-story development features flexible retail spaces, office suites, and community gathering areas designed to accommodate Kenya's dynamic entrepreneurial landscape. The architectural design incorporates passive cooling techniques, natural ventilation, and energy-efficient systems that are essential in Nairobi's equatorial climate. The building serves as more than just a commercial space—it becomes a community hub where business, culture, and social interaction converge, supporting local economic growth while maintaining architectural excellence and sustainable design principles.",
    images: [
      "/mockdata/ruiru/Renders/optimized/ruiru-render-1-desktop.jpg",
      "/mockdata/ruiru/Renders/optimized/ruiru-render-2-desktop.jpg",
      "/mockdata/ruiru/Renders/optimized/ruiru-render-3-desktop.jpg",
      "/mockdata/ruiru/Renders/optimized/ruiru-render-4-desktop.jpg"
    ],
    year: "2024",
    location: "Ruiru, Kenya",
    size: "85,000 sq ft",
    status: "Planning",
    features: [
      "Modern Commercial Spaces",
      "Flexible Office Suites",
      "Community Integration",
      "Passive Cooling Design",
      "Energy-Efficient Systems",
      "Economic Development Focus"
    ]
  },
  "nyeri": {
    id: 4,
    title: "Nyeri Cultural Heritage Center",
    slug: "nyeri",
    category: "Cultural",
    description: "Cultural preservation center that bridges traditional Kenyan heritage with contemporary architectural expression.",
    longDescription: "The Nyeri Cultural Heritage Center stands as a testament to Kenya's rich cultural history while embracing modern architectural innovation. This center serves as both a museum and community space, showcasing traditional Kikuyu cultural artifacts, performing arts, and historical exhibits. The design thoughtfully incorporates elements of traditional Kikuyu architecture—organic forms, natural materials, and symbolic patterns—while providing state-of-the-art facilities for cultural preservation and education. The center features interactive galleries, performance spaces, and outdoor areas that connect visitors with Nyeri's cultural heritage while fostering community engagement and cultural education for future generations.",
    images: [
      "/mockdata/Nyeri/optimized/001-desktop.jpg",
      "/mockdata/Nyeri/optimized/002-desktop.jpg",
      "/mockdata/Nyeri/optimized/003-desktop.jpg",
      "/mockdata/Nyeri/optimized/004-desktop.jpg"
    ],
    year: "2023",
    location: "Nyeri, Kenya",
    size: "35,000 sq ft",
    status: "Completed",
    features: [
      "Cultural Preservation",
      "Traditional Architecture",
      "Interactive Galleries",
      "Community Education",
      "Performance Spaces",
      "Cultural Heritage"
    ]
  }
};

// Helper functions
export function getAllProjects(): ProjectData[] {
  return Object.values(projects);
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projects);
}
