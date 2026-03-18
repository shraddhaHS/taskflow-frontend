export default function SkeletonCard() {
  return (
    <div className="bg-[#1a1f2e] rounded-2xl p-5 border border-[#2a3040] animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="h-4 bg-[#2a3040] rounded w-3/5"></div>
        <div className="h-6 bg-[#2a3040] rounded-full w-16"></div>
      </div>
      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-[#2a3040] rounded w-full"></div>
        <div className="h-3 bg-[#2a3040] rounded w-4/5"></div>
        <div className="h-3 bg-[#2a3040] rounded w-3/5"></div>
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#2a3040]">
        <div className="h-6 bg-[#2a3040] rounded w-24"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-[#2a3040] rounded w-8"></div>
          <div className="h-8 bg-[#2a3040] rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}
