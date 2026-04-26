"use client";
import { useState } from 'react';
import { PlayerBadge } from './PlayerBadge';

export const MatchCard = ({ homeTeam, awayTeam, sharedPlayers, competition }: any) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      onClick={() => setIsRevealed(true)}
      className="group relative bg-[#121212] border border-slate-800 rounded-3xl p-6 transition-all hover:bg-[#161616] hover:border-slate-700 flex flex-col h-full"
    >
      <div className="flex flex-col mb-8">
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2">{competition}</span>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black italic uppercase tracking-tighter">{homeTeam}</div>
          <div className="text-[10px] font-bold text-slate-800 italic">VS</div>
          <div className="text-2xl font-black italic uppercase tracking-tighter text-right">{awayTeam}</div>
        </div>
      </div>

      <div className="mt-auto">
        {!isRevealed ? (
          <div className="py-4 text-center border-2 border-dashed border-slate-800 rounded-2xl group-hover:border-blue-500/30 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 uppercase tracking-widest">
              Reveal {sharedPlayers.length} Legends
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {sharedPlayers.map((p: string) => <PlayerBadge key={p} name={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};