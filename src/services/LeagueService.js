/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */
class LeagueService {
  #token = "";
  #matches = [];

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.#matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.#matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const _matches = [
      {
        matchDate: 1651744228685,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Serbia",
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 0,
      },
      {
        matchDate: 1651744228685,
        stadium: "Stade de Suisse",
        homeTeam: "Switzerland",
        awayTeam: "Serbia",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
      {
        matchDate: 1651744228685,
        stadium: "Stadion Rajko Mitic",
        homeTeam: "Serbia",
        awayTeam: "Cameroon",
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 1,
      },
      {
        matchDate: 1651744228685,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Switzerland",
        matchPlayed: true,
        homeTeamScore: 3,
        awayTeamScore: 0,
      },
      {
        matchDate: 1651744228685,
        stadium: "Maracanã",
        homeTeam: "Brazil",
        awayTeam: "Cameroon",
        matchPlayed: true,
        homeTeamScore: 4,
        awayTeamScore: 4,
      },
      {
        matchDate: 1651744228685,
        stadium: "Stade de Suisse",
        homeTeam: "Switzerland",
        awayTeam: "Cameroon",
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
    ];
    const homeTeams = _matches.map((cMatch) => cMatch.homeTeam);
    const awayTeams = _matches.map((cMatch) => cMatch.awayTeam);

    const teams = Array.from(new Set([...homeTeams, ...awayTeams]));
    let collection = {};
    teams.forEach((cteam) => (collection[cteam] = {}));
    for (const country in collection) {
      if (Object.hasOwnProperty.call(collection, country)) {
        let points = 0;
        const myMatches = _matches
          .filter(
            (cMatch) =>
              cMatch.awayTeam === country || cMatch.homeTeam === country
          )
          .map((cFilteredMatch) => {
            if (cFilteredMatch.homeTeam === country) {
              if (cFilteredMatch.homeTeamScore > cFilteredMatch.awayTeamScore) {
                cFilteredMatch.won = true;
                cFilteredMatch.lost = false;
                cFilteredMatch.draw = false;
                points += 3;
              } else if (
                cFilteredMatch.homeTeamScore < cFilteredMatch.awayTeamScore
              ) {
                cFilteredMatch.won = false;
                cFilteredMatch.lost = true;
                cFilteredMatch.draw = false;
              } else {
                cFilteredMatch.won = false;
                cFilteredMatch.lost = false;
                cFilteredMatch.draw = true;
                points += 1;
              }
            } else {
              if (cFilteredMatch.homeTeamScore < cFilteredMatch.awayTeamScore) {
                cFilteredMatch.won = true;
                cFilteredMatch.lost = false;
                cFilteredMatch.draw = false;
                points += 3;
              } else if (
                cFilteredMatch.homeTeamScore > cFilteredMatch.awayTeamScore
              ) {
                cFilteredMatch.won = false;
                cFilteredMatch.lost = true;
                cFilteredMatch.draw = false;
              } else {
                cFilteredMatch.won = false;
                cFilteredMatch.lost = false;
                cFilteredMatch.draw = true;
                points += 1;
              }
            }
            return { ...cFilteredMatch, points };
          });
        collection[country].myMatches = myMatches;
        collection[country].points = points;
      }
    }
    const ranking = [];
    for (const country in collection) {
      if (Object.hasOwnProperty.call(collection, country)) {
        const data = collection[country];
        const matchesPlayed = data.myMatches.length;
        const goalsFor = data.myMatches.reduce((a, c) => {
          if (c.homeTeamScore === country) {
            return a + c.homeTeamScore;
          } else {
            return a + c.awayTeamScore;
          }
        }, 0);
        const goalsAgainst = data.myMatches.reduce((a, c) => {
          if (c.homeTeamScore === country) {
            return a + c.awayTeamScore;
          } else {
            return a + c.homeTeamScore;
          }
        }, 0);
        ranking.push({
          teamName: country,
          matchesPlayed,
          points: data.points,
          goalsAgainst,
          goalsFor,
        });
      }
    }
    return ranking.sort(compare)
    return [
      {
        teamName: "Brazil",
        matchesPlayed: 10,
        goalsFor: 20,
        goalsAgainst: 13,
        points: 15,
      },
    ];
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */
  async fetchData() {
    if (!this.#token) {
      await this.getAuthToken();
    }
    try {
      const res = await fetch("http://localhost:3001/api/v1/getAllMatches", {
        headers: {
          Authorization: `Bearer ${this.#token}`,
        },
      });
      const json = await res.json();
      const { success = false, matches = [] } = json || {};
      if (success) {
        this.setMatches(matches);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getAuthToken() {
    try {
      const res = await fetch("http://localhost:3001/api/v1/getAccessToken");
      const json = await res.json();
      const { success = false, access_token = "" } = json || {};
      if (success) {
        this.#token = access_token;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default LeagueService;
function compare( a, b ) {
  if ( a.points < b.points ){
    return 1;
  }
  if ( a.points > b.points ){
    return -1;
  }
  return 0;
}