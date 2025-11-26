import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOHeadProps) {
  const siteName = 'Debuild - Architecture & Design';
  const siteDescription = 'Crafting architectural experiences that shape how we live, work, and connect. Modern architecture solutions for residential, commercial, and cultural projects.';
  const siteImage = image || '/og-image.png';
  const siteUrl = url || 'https://debuild.co.ke';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || siteDescription;
  const metaKeywords = [
    'architecture',
    'architectural design',
    'interior design',
    'construction',
    'Kenya architecture',
    'modern design',
    'sustainable architecture',
    ...keywords
  ].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author || 'Debuild Architecture'} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content="@debuild_ke" />

      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === 'article' ? "Article" : "Organization",
            "name": siteName,
            "description": metaDescription,
            "url": siteUrl,
            "logo": `${siteUrl}/logo.png`,
            "image": siteImage,
            "sameAs": [
              "https://www.facebook.com/debuild",
              "https://www.instagram.com/debuild_ke",
              "https://www.linkedin.com/company/debuild",
              "https://twitter.com/debuild_ke"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254-700-000-000",
              "contactType": "customer service",
              "areaServed": "KE",
              "availableLanguage": "en"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "KE",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi"
            },
            ...(type === 'article' && {
              "headline": title,
              "author": {
                "@type": "Person",
                "name": author || "Debuild Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": siteName,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/logo.png`
                }
              },
              "datePublished": publishedTime,
              "dateModified": modifiedTime,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": siteUrl
              },
              "keywords": tags.join(', ')
            })
          })
        }}
      />

      {/* Google Analytics (replace with your GA ID) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
              page_title: '${fullTitle}',
              page_location: '${siteUrl}'
            });
          `
        }}
      />
    </Head>
  );
}
