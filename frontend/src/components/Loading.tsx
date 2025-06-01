export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-4">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            <span className="text-white">Fun</span>
            <span className="text-primary">News</span>
          </h1>
        </div>

        <div>
          <p className="text-white/80 text-lg">Your vibrant news experience</p>
        </div>

        <div className="mt-8">
          <div className="w-16 h-16 border-t-4 border-r-4 border-primary rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
