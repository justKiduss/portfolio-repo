export default function Pagination({ page, onPageChange, disableNext = false }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12 border-t border-gray-200 dark:border-zinc-800 pt-8">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded font-['Inter'] text-sm bg-gray-200 dark:bg-zinc-900 dark:text-zinc-300 disabled:opacity-30 hover:bg-gray-300 dark:hover:bg-zinc-800 transition-colors"
      >
        Prev
      </button>

      {[...Array(5)].map((_, i) => {
        const pageNum = page <= 3 ? i + 1 : page - 2 + i;
        const isActive = page === pageNum;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded font-['JetBrains_Mono'] text-sm transition-colors ${
              isActive
                ? "bg-cyan-600 text-white dark:bg-[#2DE2C1] dark:text-black font-semibold"
                : "bg-gray-100 dark:bg-zinc-900 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        disabled={disableNext}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded font-['Inter'] text-sm bg-gray-200 dark:bg-zinc-900 dark:text-zinc-300 disabled:opacity-30 hover:bg-gray-300 dark:hover:bg-zinc-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
}