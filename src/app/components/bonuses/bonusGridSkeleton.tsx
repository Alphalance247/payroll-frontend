"use client";

interface BonusGridSkeletonProps {
  statCardCount?: number;
  showChart?: boolean;
  showRecentActivities?: boolean;
}

const Shimmer = ({ className }: { className: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const BonusGridSkeleton = ({
  statCardCount = 4,
  showChart = false,
  showRecentActivities = false,
}: BonusGridSkeletonProps) => {
  return (
    <div className="space-y-4">
      {/* Stat cards */}
      {statCardCount > 0 && (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${statCardCount}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: statCardCount }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-[#E3E3E5] p-5 space-y-3"
            >
              <Shimmer className="h-3 w-28" />
              <Shimmer className="h-7 w-36" />
              <Shimmer className="h-3 w-20" />
            </div>
          ))}
        </div>
      )}

      {/* Chart + recent activities row */}
      {(showChart || showRecentActivities) && (
        <div className="grid grid-cols-[3fr_2fr] gap-4 mt-4">
          {showChart && (
            <div className="bg-white rounded-xl border border-[#E3E3E5] p-6 space-y-6">
              <Shimmer className="h-4 w-36" />
              <div className="flex items-center gap-10">
                {/* Donut placeholder */}
                <div className="h-40 w-40 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                {/* Legend */}
                <div className="flex-1 space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-gray-200 animate-pulse flex-shrink-0" />
                      <Shimmer className={`h-3 ${i % 2 === 0 ? "w-24" : "w-20"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showRecentActivities && (
            <div className="bg-white rounded-xl border border-[#E3E3E5] p-5 space-y-4">
              <Shimmer className="h-4 w-32" />
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Shimmer className="h-3 w-3/4" />
                      <Shimmer className="h-3 w-1/2" />
                    </div>
                    <Shimmer className="h-3 w-12" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BonusGridSkeleton;
