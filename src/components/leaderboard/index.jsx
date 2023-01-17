import React, { useContext, useEffect, useRef, useState } from "react";
import { LeagueServiceContext } from "../../contexts";
import "./index.scss";
const Headers = [
  {
    key: "name",
    id: "country",
    name: "Team Name",
    className: "full-width th-left",
  },
  { key: "mp", id: "mp", name: "MP", className: "" },
  { key: "gf", id: "gf", name: "GF", className: "" },
  { key: "ga", id: "ga", name: "GA", className: "" },
  { key: "gd", id: "gd", name: "GD", className: "" },
  { key: "points", id: "points", name: "Points", className: "" },
];
const uae = "http://countryflagsapi.com/png/br";
const data = [
  {
    key: "id-1",
    id: "country",
    countryName: "Brazil",
    flag: uae,
    mp: "10",
    gf: "10",
    ga: "10",
    points: "5",
  },
];
const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <div className="page-title">League Standings</div>
      <div className="table">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default Leaderboard;

const Body = () => {
  const [rankings, setRankings] = useState([]);
  const matchesFetchedRef = useRef(false);
  const { league } = useContext(LeagueServiceContext);
  const interval = useRef(null);
  useEffect(() => {
    const _rankings = league.getLeaderboard();
    if (!!_rankings.length) {
      setRankings(_rankings);
      matchesFetchedRef.current = true;
    } else {
      interval.current = setTimeout(() => {
        if (!matchesFetchedRef.current) {
          const _rankings = league.getMatches();
          if (_rankings) {
            setRankings(_rankings);
          }
        }
      }, [1000]);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="table-body">
      {rankings.map((cData) => {
        const {
          key,
          teamName = "",
          ga = 0,
          gf = 0,
          mp = 0,
          points = 0,
        } = cData || {};
        const gd = Math.abs(gf - ga);
        return (
          <div key={key} className="tr">
            <div className="td country-cell">
              <div className="country">
                <img
                  src={`https://countryflagsapi.com/png/${teamName}`}
                  alt=""
                />
                <span>{teamName}</span>
              </div>
            </div>
            <div className="td ">{mp}</div>
            <div className="td ">{gf}</div>
            <div className="td ">{ga}</div>
            <div className="td ">{gd}</div>

            <div className="td is-bold">{points}</div>
          </div>
        );
      })}
    </div>
  );
};

const Header = () => {
  return (
    <div className="headers">
      {Headers.map((cHeader) => {
        const { key, name, className } = cHeader || {};
        return (
          <div key={key} className={`th ${className}`}>
            {name}
          </div>
        );
      })}
    </div>
  );
};
