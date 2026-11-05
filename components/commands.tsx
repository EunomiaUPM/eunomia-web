/** Commands to copy, on a soft panel. */
export function Commands({ title, commands, className = '' }: { title: string; commands: string[]; className?: string }) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-[20px] bg-gradient-to-br from-mist to-[#f1eeff] ${className}`}>
      <p className="px-5 pt-4 text-xs font-semibold text-[#6a4fe0] first-letter:uppercase">{title}</p>
      <pre className="whitespace-pre-wrap break-words px-5 pb-5 pt-2 font-mono text-[13px] leading-6 text-ink">
        {commands.map((c) => (
          <div key={c} className="py-0.5 pl-4 -indent-4">{c}</div>
        ))}
      </pre>
    </div>
  );
}
