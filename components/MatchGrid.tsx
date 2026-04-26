import { MatchCard } from './MatchCard';

type Match = {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  sharedPlayers: string[];
  competition: string;
};

// This is where your API data will flow in
export const MatchGrid = ({ matches }: { matches: Match[] }) => {
  return (
    <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {matches.map((match) => (
        <MatchCard
          key={`${match.homeTeam}-${match.awayTeam}-${match.competition}`}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          homeLogo={match.homeLogo}
          awayLogo={match.awayLogo}
          sharedPlayers={match.sharedPlayers}
          competition={match.competition}
        />
      ))}
    </section>
  );
};