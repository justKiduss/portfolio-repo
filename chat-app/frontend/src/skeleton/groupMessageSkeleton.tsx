export function GroupChatMessagesSkeleton() {
  return (
    <div className="flex flex-col justify-end h-full space-y-5 p-4 animate-pulse">
      
      {/* 1. Left Bubble (Other Member) */}
      <div className="flex items-start gap-2.5 max-w-[70%]">
        {/* Avatar Circle */}
        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
        <div className="flex flex-col space-y-1.5 w-full">
          {/* Sender Name Identifier */}
          <div className="w-16 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          {/* Content Block */}
          <div className="w-48 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-2xl rounded-tl-none" />
        </div>
      </div>
      
      {/* 2. Right Bubble (Current User) */}
      <div className="flex justify-end ml-auto max-w-[70%] w-full">
        <div className="flex flex-col items-end space-y-1.5 w-full">
          <div className="w-32 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-2xl rounded-tr-none" />
        </div>
      </div>

      {/* 3. Left Bubble (Another Member) */}
      <div className="flex items-start gap-2.5 max-w-[70%]">
        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
        <div className="flex flex-col space-y-1.5 w-full">
          <div className="w-20 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="w-64 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl rounded-tl-none" />
        </div>
      </div>

      {/* 4. Right Bubble Short (Current User) */}
      <div className="flex justify-end ml-auto max-w-[70%] w-full">
        <div className="flex flex-col items-end space-y-1.5 w-full">
          <div className="w-24 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-2xl rounded-tr-none" />
        </div>
      </div>
      
    </div>
  );
}