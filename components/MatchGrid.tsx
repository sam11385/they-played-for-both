import { MatchCard } from './MatchCard';

// This is where your API data will flow in
export const MatchGrid = ({ matches }: { matches: any[] }) => {
  return (
    <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {matches.map((match) => (
        <MatchCard key={match.id} {...match} />
      ))}
    </section>
  );
};