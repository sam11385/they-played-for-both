import Header from "@/components/Header";
import { MatchGrid } from "@/components/MatchGrid";
import { getSharedPlayers } from "@/lib/utils/player-lookup";

const todaysMatches = [
  { home: "CHE", away: "LEE", competition: "Premier League" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="flex w-full max-w-5xl flex-1 px-6 py-10">
        <MatchGrid
          matches={todaysMatches.map((match) => ({
            ...match,
            homeTeam: match.home,
            awayTeam: match.away,
            sharedPlayers: getSharedPlayers(match.home, match.away),
          }))}
        />
      </main>
    </div>
  );
}
