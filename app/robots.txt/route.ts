import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const robotsTxt = `# Debuild Architecture - Robots.txt
# https://debuild.co.ke/robots.txt

User-agent: *
Allow: /

# Allow all major search engine bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /protected/

# Disallow development and temporary files
Disallow: /*.json$
Disallow: /*.log$
Disallow: /_next/
Disallow: /.next/

# Allow access to CSS, JS, and image files
Allow: /_next/static/
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.svg$
Allow: /*.ico$
Allow: /*.webp$

# Sitemap
Sitemap: https://debuild.co.ke/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
