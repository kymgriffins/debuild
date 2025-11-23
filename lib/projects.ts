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
      "/mockdata/Kijabe/001.png",
      "/mockdata/Kijabe/002.png",
      "/mockdata/Kijabe/003.png",
      "/mockdata/Kijabe/004.png",
      "/mockdata/Kijabe/005.png",

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
      "/mockdata/ruiru/Construction/ruiru-construction-1.jpg",
      "/mockdata/ruiru/Construction/ruiru-construction-2.jpg",
      "/mockdata/ruiru/Construction/ruiru-construction-3.jpg",
      "/mockdata/ruiru/Construction/ruiru-construction-4.jpg"
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
      "/mockdata/ruiru/Renders/ruiru-render-1.jpg",
      "/mockdata/ruiru/Renders/ruiru-render-2.jpg",
      "/mockdata/ruiru/Renders/ruiru-render-3.jpg",
      "/mockdata/ruiru/Renders/ruiru-render-4.jpg"
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
      "/mockdata/Nyeri/001.png",
      "/mockdata/Nyeri/002.png",
      "/mockdata/Nyeri/003.png",
      "/mockdata/Nyeri/004.png"
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
  },
  "katani": {
    id: 5,
    title: "Katani Mixed-Use Development",
    slug: "katani",
    category: "Mixed-Use",
    description: "Innovative mixed-use development combining residential, commercial, and community spaces in Nairobi's dynamic Katani area.",
    longDescription: "The Katani Mixed-Use Development represents a visionary approach to urban living in Nairobi's rapidly evolving landscape. This comprehensive project integrates residential apartments, retail spaces, and community facilities into a cohesive, pedestrian-friendly environment. The architectural design embraces sustainable building practices with green roofs, rainwater harvesting, and energy-efficient systems that reduce environmental impact while providing modern, comfortable living spaces. The development includes rooftop gardens, communal spaces, and local business opportunities that strengthen community bonds and support local economic growth. This project exemplifies how thoughtful urban planning can create vibrant, sustainable neighborhoods that meet the needs of contemporary Kenyan families.",
    images: [
      "/mockdata/katani/01-exterior-overview.jpeg",
      "/mockdata/katani/02-retail-facade.jpeg",
      "/mockdata/katani/03-residential-units.jpeg",
      "/mockdata/katani/04-community-spaces.jpeg",
      "/mockdata/katani/05-rooftop-gardens.jpeg",
      "/mockdata/katani/06-landscape-design.jpeg",
      "/mockdata/katani/07-staircase-detail.jpeg",
      "/mockdata/katani/08-facade-illumination.jpeg",
      "/mockdata/katani/09-entrance-communal.jpeg",
      "/mockdata/katani/10-modern-interior.jpeg"
    ],
    year: "2025",
    location: "Katani, Nairobi, Kenya",
    size: "150,000 sq ft",
    status: "Under Construction",
    features: [
      "Mixed-Use Development",
      "Sustainable Design",
      "Rooftop Gardens",
      "Community Spaces",
      "Energy-Efficient Systems",
      "Local Business Integration"
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
