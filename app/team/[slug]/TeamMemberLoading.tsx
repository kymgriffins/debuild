export default function TeamMemberLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative h-96 bg-gray-200">
        <div className="absolute bottom-8 left-8 z-20">
          <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-5 bg-gray-300 rounded w-32"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Bio Section */}
        <div className="mb-12">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-6 bg-gray-100 rounded-lg">
              <div className="h-8 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Specializations */}
        <div className="mb-12">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map((category) => (
              <div key={category}>
                <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((skill) => (
                    <div key={skill} className="h-6 bg-gray-200 rounded w-20"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t pt-12">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 bg-gray-300 rounded w-32"></div>
            <div className="h-12 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
