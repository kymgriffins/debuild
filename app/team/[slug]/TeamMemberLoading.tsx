export function TeamMemberLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-gray-100 to-primary/10">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Back Button Skeleton */}
          <div className="mb-8">
            <div className="w-32 h-9 bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Skeleton */}
            <div className="relative">
              <div className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-16 bg-gray-300 rounded-xl animate-pulse"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div>
                <div className="w-80 h-12 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                <div className="w-48 h-6 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Stats Skeleton */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-1"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-1"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mx-auto mb-1"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>

              {/* Buttons Skeleton */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-3">
                    <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-18 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="w-80 h-10 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects Skeleton */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <div className="w-72 h-10 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="w-96 h-5 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-5/6 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Education Skeleton */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Skills Skeleton */}
            <div className="space-y-6">
              <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-3">
                  <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-18 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-14 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Awards Skeleton */}
            <div className="space-y-8">
              {/* Education */}
              <div className="space-y-4">
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex">
                    <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 mr-4 animate-pulse"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Awards */}
              <div className="space-y-4">
                <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                {[1, 2, 3].map((index) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophies Skeleton */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="w-80 h-5 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  <div className="w-4/5 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-16 lg:py-24 bg-gray-800">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <div className="w-80 h-12 bg-gray-600 rounded-lg animate-pulse mx-auto mb-4"></div>
          <div className="w-96 h-5 bg-gray-600 rounded animate-pulse mx-auto mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="flex-1 h-12 bg-gray-600 rounded-md animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-600 rounded-md animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
