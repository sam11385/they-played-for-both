import sharedData from "@/data/shared-players.json";

type Match = {
  homeTeam: string;
  awayTeam: string;
  sharedPlayers: string[];
};

type MatchesByDate = Record<string, Match[]>;

function isSameFixture(match: Match, teamA: string, teamB: string) {
  return (
    (match.homeTeam === teamA && match.awayTeam === teamB) ||
    (match.homeTeam === teamB && match.awayTeam === teamA)
  );
}

export function getSharedPlayers(teamA: string, teamB: string, date?: string): string[] {
  const matchesByDate = sharedData as MatchesByDate;

  if (date) {
    const matchOnDate = (matchesByDate[date] ?? []).find((match) =>
      isSameFixture(match, teamA, teamB),
    );
    return matchOnDate?.sharedPlayers ?? [];
  }

  for (const matches of Object.values(matchesByDate)) {
    const match = matches.find((item) => isSameFixture(item, teamA, teamB));
    if (match) return match.sharedPlayers;
  }

  return [];
}