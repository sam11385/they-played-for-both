const API_BASE_URL = "https://v3.football.api-sports.io";

function getApiKey() {
  const apiKey = process.env.FOOTBALL_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FOOTBALL_API_KEY environment variable.");
  }

  return apiKey;
}

export async function footballApiFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "x-apisports-key": getApiKey(),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Football API request failed: ${response.status}`);
  }

  return response.json();
}


