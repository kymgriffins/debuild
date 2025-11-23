import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getAllTeamMemberSlugs, getTeamMemberBySlug } from '@/lib/teams'
import { TeamMemberContent } from './TeamMemberContent'
import TeamMemberLoading from './TeamMemberLoading'

// Generate static params for better performance
export async function generateStaticParams() {
  const slugs = await getAllTeamMemberSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params
    const member = await getTeamMemberBySlug(resolvedParams.slug)

    if (!member) {
      return {
        title: 'Team Member Not Found - Debuild Architects',
        description: 'Team member profile not found.'
      }
    }

    return {
      title: `${member.name} - ${member.role} | Debuild Architects`,
      description: member.bio,
      openGraph: {
        title: `${member.name} - ${member.role}`,
        description: member.bio,
        images: [member.image],
        type: 'profile',
      },
    }
  } catch (error) {
    return {
      title: 'Team Member - Debuild Architects',
      description: 'Meet our team member at Debuild Architects.'
    }
  }
}

// Main page component with Suspense boundary
export default function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<TeamMemberLoading />}>
      <TeamMemberPageContent params={params} />
    </Suspense>
  )
}

// Separate component that handles data fetching
async function TeamMemberPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  let member

  try {
    member = await getTeamMemberBySlug(resolvedParams.slug)
  } catch (error) {
    console.error('Error fetching team member:', error)
    notFound()
  }

  if (!member) {
    notFound()
  }

  return <TeamMemberContent member={member} />
}
