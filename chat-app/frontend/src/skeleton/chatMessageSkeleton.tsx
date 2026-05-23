export function ChatMessagesSkeleton() {
  return (
    <div className="flex flex-col justify-end h-full space-y-4 animate-pulse">
      {/* Left bubble skeleton */}
      <div className="flex justify-start">
        <div className="w-1/2 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-2xl rounded-tl-none" />
      </div>
      
      {/* Right bubble skeleton */}
      <div className="flex justify-end">
        <div className="w-1/3 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-2xl rounded-tr-none" />
      </div>

      {/* Left bubble skeleton short */}
      <div className="flex justify-start">
        <div className="w-2/3 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-2xl rounded-tl-none" />
      </div>
    </div>
  );
}