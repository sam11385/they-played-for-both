export const PlayerBadge = ({ name }: { name: string }) => (
  <div className="group relative bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-help shadow-sm overflow-hidden">
    <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
      {name}
    </span>
    {/* Subtle gloss effect for that 2026 UI vibe */}
    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-5 group-hover:animate-shine" />
  </div>
);