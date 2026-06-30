function LeaderboardLoading() {
  return (
    <div className="animate-pulse flex flex-col gap-4 mt-8">
      {/* Podium Skeleton */}
      <div className="flex items-end justify-center gap-4 mb-8">
        <div className="w-24 h-32 bg-white/50 rounded-2xl" />
        <div className="w-32 h-40 bg-white/50 rounded-2xl" />
        <div className="w-24 h-28 bg-white/50 rounded-2xl" />
      </div>

      {/* Row Skeletons */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-20 w-full bg-white/50 rounded-2xl" />
      ))}
    </div>
  );
}

export default LeaderboardLoading;
