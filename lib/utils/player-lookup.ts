import sharedData from '../../data/shared-players.json';

export function getSharedPlayers(teamA: string, teamB: string): string[] {
    // Create a consistent key (e.g., "ARS-FUL" instead of "FUL-ARS")
    const sortedKey = [teamA, teamB].sort().join('-');
    
    // Return the players or an empty array if none found
    return (sharedData as Record<string, string[]>)[sortedKey] || [];
}