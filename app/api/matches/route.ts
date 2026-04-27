import { NextResponse } from "next/server";
import { footballApiFetch } from "@/lib/api/football";

const FALLBACK_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%231e293b'/%3E%3Ctext x='32' y='38' text-anchor='middle' font-family='Arial' font-size='26' fill='%2394a3b8'%3E%3F%3C/text%3E%3C/svg%3E";

type FixtureResponse = {
  response?: Array<{
    teams?: {
      home?: {
        name?: string;
        logo?: string;
      };
      away?: {
        name?: string;
        logo?: string;
      };
    };
    league?: {
      name?: string;
    };
  }>;
};

type Match = {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  sharedPlayers: string[];
  competition: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Missing required date query parameter." }, { status: 400 });
  }

  try {
    const fixtures = (await footballApiFetch(`/fixtures?date=${date}`)) as FixtureResponse;

    const matches: Match[] =
      fixtures.response?.map((fixture) => {
        const homeTeam = fixture.teams?.home?.name ?? "Unknown Home";
        const awayTeam = fixture.teams?.away?.name ?? "Unknown Away";
        const homeLogo = fixture.teams?.home?.logo ?? FALLBACK_LOGO;
        const awayLogo = fixture.teams?.away?.logo ?? FALLBACK_LOGO;
        const competition = fixture.league?.name ?? "Unknown Competition";

        return {
          homeTeam,
          awayTeam,
          homeLogo,
          awayLogo,
          competition,
          // Shared-player enrichment is still local/business logic, so initialize empty for API fixtures.
          sharedPlayers: [],
        };
      }) ?? [];

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return NextResponse.json({ error: "Failed to fetch matches from Football API." }, { status: 500 });
  }
}
