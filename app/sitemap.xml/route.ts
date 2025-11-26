import { NextRequest } from 'next/server';
import { getAllProjects, getAllTeamMembers, getAllServices } from '@/lib/supabase/queries';

export async function GET(request: NextRequest) {
  try {
    // Fetch all dynamic content
    const [projects, teamMembers, services] = await Promise.all([
      getAllProjects(),
      getAllTeamMembers(),
      getAllServices()
    ]);

    // Static pages
    const staticPages = [
      '',
      '/about',
      '/contact',
      '/services',
      '/projects',
      '/team',
      '/blog',
      '/debuild-basic-calculator'
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Static Pages -->
  ${staticPages.map(page => `
  <url>
    <loc>https://debuild.co.ke${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}

  <!-- Projects -->
  ${projects.map(project => `
  <url>
    <loc>https://debuild.co.ke/project/${project.slug}</loc>
    <lastmod>${project.updated_at.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}

  <!-- Team Members -->
  ${teamMembers.map(member => `
  <url>
    <loc>https://debuild.co.ke/team/${member.slug}</loc>
    <lastmod>${member.updated_at.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}

  <!-- Services -->
  ${services.filter(service => service.is_featured).map(service => `
  <url>
    <loc>https://debuild.co.ke/services#${service.slug}</loc>
    <lastmod>${service.updated_at.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Blog Posts (if any exist) -->
  <!-- Blog posts would be added here when the blog system is populated -->

</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return a basic sitemap if there's an error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://debuild.co.ke</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300'
      }
    });
  }
}
