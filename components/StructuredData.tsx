import { Metadata } from 'next'

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'project'
  data?: any
}

export function StructuredData({ type = 'website', data }: StructuredDataProps) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Debuild Architecture',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Award-winning architectural design firm specializing in residential, commercial, and sustainable building projects in Kenya.',
          foundingDate: '2023',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Kenya',
            addressRegion: 'Nairobi'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+254-XXX-XXXXXX',
            contactType: 'customer service',
            availableLanguage: 'English',
            email: 'hello@debuildarchitecture.com'
          },
          sameAs: [
            'https://linkedin.com/company/debuild-architecture',
            'https://twitter.com/debuildarch',
            'https://instagram.com/debuildarchitecture'
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Architectural Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Residential Architecture',
                  description: 'Custom residential design and construction services'
                }
              },
              {
                '@type': 'Service',
                name: 'Commercial Architecture',
                description: 'Commercial building design and project management'
              },
              {
                '@type': 'Service',
                name: 'Sustainable Design',
                description: 'Eco-friendly architectural solutions'
              }
            ]
          }
        }

      case 'project':
        if (!data) return null
        return {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: data.title,
          description: data.description,
          creator: {
            '@type': 'Organization',
            name: 'Debuild Architecture'
          },
          dateCreated: data.year,
          location: {
            '@type': 'Place',
            name: data.location
          },
          about: data.category,
          image: data.images?.[0] ? `${baseUrl}${data.images[0]}` : undefined,
          url: `${baseUrl}/project/${data.slug}`
        }

      default: // website
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Debuild Architecture',
          description: 'Award-winning architectural design firm specializing in residential, commercial, and sustainable building projects.',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Debuild Architecture'
          }
        }
    }
  }

  const structuredData = getStructuredData()
  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
}
