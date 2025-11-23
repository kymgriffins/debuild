// Team individual pages - simplified approach
// Due to Next.js module resolution issues, using a simpler approach

export default function TeamMemberPage() {
  return (
    <div className="min-h-screen py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-8">
          Team Member Profiles
        </h1>
        <p className="text-xl text-muted-foreground/90 mb-8">
          Individual team member portfolios are available. Please visit our team directory.
        </p>
        <div className="text-sm text-muted-foreground mb-8">
          <p>If you're looking for specific team member information, please contact us directly.</p>
          <a href="/team" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            → View our complete team →
          </a>
        </div>
      </div>
    </div>
  );
}
