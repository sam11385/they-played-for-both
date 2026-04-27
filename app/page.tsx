"use client";

import Header from "@/components/Header";
import { MatchGrid } from "@/components/MatchGrid";
import { useEffect, useState } from "react";
type Match = {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  sharedPlayers: string[];
  competition: string;
};

export default function Home() {
  const todayDate = new Date().toISOString().split("T")[0];
  const [matchesForSelectedDate, setMatchesForSelectedDate] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchMatches = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch(`/api/matches?date=${todayDate}`);
        if (!response.ok) {
          throw new Error("Unable to load matches right now.");
        }

        const data = (await response.json()) as { matches: Match[] };
        if (!isCancelled) {
          setMatchesForSelectedDate(data.matches ?? []);
        }
      } catch (error) {
        if (!isCancelled) {
          setMatchesForSelectedDate([]);
          setLoadError(error instanceof Error ? error.message : "Unable to load matches right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchMatches();

    return () => {
      isCancelled = true;
    };
  }, [todayDate]);

  const formattedSelectedDate = new Date(`${todayDate}T00:00:00`).toLocaleDateString(
    "en-GB",
  );

  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center font-sans bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#0a0a0c_70%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] before:bg-[size:20px_20px]">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px -translate-x-1/2 bg-white/5" />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center">
        <Header />
        <main className="flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
          <div className="px-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">Today&apos;s Matches</h1>
          </div>
          <p className="px-4 text-sm text-slate-300">Viewing matches for {formattedSelectedDate}</p>
          {isLoading ? (
            <p className="px-4 text-sm font-medium text-slate-300">Loading matches...</p>
          ) : loadError ? (
            <p className="px-4 text-sm font-medium text-red-300">{loadError}</p>
          ) : matchesForSelectedDate.length > 0 ? (
            <MatchGrid matches={matchesForSelectedDate} />
          ) : (
            <p className="px-4 text-sm font-medium text-slate-300">
              No matches available for this date.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
