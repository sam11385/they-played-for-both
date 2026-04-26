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
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
        <div className="flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Today&apos;s Matches
          </h1>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="text-sm font-semibold text-blue-600 underline-offset-4 transition hover:underline dark:text-blue-400"
            >
              Select day
            </button>
            {showCalendar ? (
              <div className="absolute right-0 z-10 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            ) : null}
          </div>
        </div>
        <p className="px-4 text-sm text-slate-500 dark:text-slate-400">
          Viewing matches for {formattedSelectedDate}
        </p>
        {matchesForSelectedDate.length > 0 ? (
          <MatchGrid matches={matchesForSelectedDate} />
        ) : (
          <p className="px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            No matches available for this date yet.
          </p>
        )}
      </main>
    </div>
  );
}
