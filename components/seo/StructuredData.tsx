import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Add structured data to document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';

    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
}

// Predefined structured data templates
export const structuredDataTemplates = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Debuild Architecture",
    "alternateName": "Outline Design Limited",
    "description": "Award-winning architectural design firm specializing in residential, commercial, and sustainable building projects in Kenya.",
    "url": "https://debuild.co.ke",
    "logo": "https://debuild.co.ke/logo.png",
    "image": "https://debuild.co.ke/og-image.png",
    "foundingDate": "2022",
    "founders": [
      {
        "@type": "Person",
        "name": "Judy Chesire",
        "jobTitle": "Principal Architect"
      },
      {
        "@type": "Person",
        "name": "Kevin Yegon",
        "jobTitle": "Design Director & Lead Visualizer"
      },
      {
        "@type": "Person",
        "name": "Kimwetich Weldon",
        "jobTitle": "Project Manager & Architect"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Westlands Business Park",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "addressCountry": "KE"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+254-700-000-000",
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": "en"
      },
      {
        "@type": "ContactPoint",
        "url": "https://debuild.co.ke/contact",
        "contactType": "customer support"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/debuild",
      "https://www.instagram.com/debuild_ke",
      "https://www.linkedin.com/company/debuild",
      "https://twitter.com/debuild_ke"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Architecture Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Architectural Design",
            "description": "Complete architectural design services from concept to construction documents."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interior Design",
            "description": "Transform your space with expert interior design services."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Project Management",
            "description": "Professional project management to ensure smooth construction."
          }
        }
      ]
    }
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://debuild.co.ke/#organization",
    "name": "Debuild Architecture",
    "alternateName": "Outline Design Limited",
    "image": "https://debuild.co.ke/og-image.png",
    "description": "Premier architectural design firm in Kenya specializing in residential, commercial, and sustainable building projects.",
    "url": "https://debuild.co.ke",
    "telephone": "+254-700-000-000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Westlands Business Park",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.2864",
      "longitude": "36.8172"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/debuild",
      "https://www.instagram.com/debuild_ke",
      "https://www.linkedin.com/company/debuild",
      "https://twitter.com/debuild_ke"
    ]
  },

  project: (project: any) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://debuild.co.ke/project/${project.slug}`,
    "image": project.images?.[0] || "https://debuild.co.ke/og-image.png",
    "datePublished": project.year,
    "location": {
      "@type": "Place",
      "name": project.location
    },
    "about": {
      "@type": "Thing",
      "name": project.category
    },
    "creator": {
      "@type": "Organization",
      "name": "Debuild Architecture"
    }
  }),

  blogPost: (post: any) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featured_image || "https://debuild.co.ke/og-image.png",
    "url": `https://debuild.co.ke/blog/${post.slug}`,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Person",
      "name": post.author_name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Debuild Architecture",
      "logo": {
        "@type": "ImageObject",
        "url": "https://debuild.co.ke/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://debuild.co.ke/blog/${post.slug}`
    },
    "keywords": post.tags?.join(', ') || ''
  }),

  service: (service: any) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Debuild Architecture"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "hasOfferCatalog": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": service.price_range,
        "priceCurrency": "USD"
      }
    }
  })
};
