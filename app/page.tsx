"use client";

import Header from "@/components/Header";
import { MatchGrid } from "@/components/MatchGrid";
import sharedPlayersByDate from "@/data/shared-players.json";
import { useState } from "react";
type Match = {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  sharedPlayers: string[];
  competition: string;
};
type MatchesByDate = Record<string, Match[]>;

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().split("T")[0],
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const matchesForSelectedDate =
    (sharedPlayersByDate as MatchesByDate)[selectedDate] ?? [];
  const formattedSelectedDate = new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
    "en-GB",
  );

  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center font-sans bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#0a0a0c_70%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[size:20px_20px]">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px -translate-x-1/2 bg-white/5" />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center">
        <Header />
        <main className="flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              Today&apos;s Matches
            </h1>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendar((prev) => !prev)}
                className="text-sm font-semibold text-blue-300 underline-offset-4 transition hover:underline"
              >
                Select day
              </button>
              {showCalendar ? (
                <div className="absolute right-0 z-10 mt-2 rounded-xl border border-white/10 bg-slate-900 p-3 shadow-lg">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : null}
            </div>
          </div>
          <p className="px-4 text-sm text-slate-300">Viewing matches for {formattedSelectedDate}</p>
          {matchesForSelectedDate.length > 0 ? (
            <MatchGrid matches={matchesForSelectedDate} />
          ) : (
            <p className="px-4 text-sm font-medium text-slate-300">
              No matches available for this date yet.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
