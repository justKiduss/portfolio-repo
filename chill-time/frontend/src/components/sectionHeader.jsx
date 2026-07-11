export default function SectionHeader({ label, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {label && (
        <span className="font-['Barlow_Condensed'] font-semibold tracking-[0.2em] uppercase text-xs text-gray-400 dark:text-zinc-500 shrink-0">
          {label}
        </span>
      )}
      <h1 className="font-['Barlow_Condensed'] font-bold text-2xl tracking-wide text-dark dark:text-white shrink-0">
        {title}
      </h1>
      <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
    </div>
  );
}