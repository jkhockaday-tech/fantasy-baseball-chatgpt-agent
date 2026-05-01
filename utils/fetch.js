const LEAGUE_ID = process.env.ESPN_LEAGUE_ID;
const BASE_URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/seasons";

async function fetchESPNData(season, view) {
  const year = season || process.env.ESPN_SEASON_YEAR || new Date().getFullYear();
  const url = `${BASE_URL}/${year}/segments/0/leagues/${LEAGUE_ID}?view=${view}`;

  const headers = {};

  if (view === "kona_player_info") {
    headers["x-fantasy-filter"] = JSON.stringify({
      players: {
        limit: 2500,
        sortDraftRanks: {
          sortPriority: 100,
          sortAsc: true,
          value: "STANDARD"
        }
      }
    });
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`ESPN API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchTeamMetadata(season) {
  return fetchESPNData(season, "mTeam");
}

module.exports = { fetchESPNData, fetchTeamMetadata };
