import React, { useContext, useRef, useState, useEffect } from "react";

import { getFormattedDateTime } from "../../common/utils";
import { LeagueServiceContext } from "../../contexts";
import { SCHEDULES_HEADER } from "./constants";
import "./index.scss";

const Schedules = () => {
  return (
    <div className="schedules">
      <div className="page-title">League Schedule</div>
      <div className="table">
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default Schedules;

const Body = () => {
  const [matches, setMatches] = useState([]);
  const matchesFetchedRef = useRef(false);
  const { league } = useContext(LeagueServiceContext);
  const interval = useRef(null);
  useEffect(() => {
    const _matches = league.getMatches();
    if (!!_matches.length) {
      setMatches(_matches);
      matchesFetchedRef.current = true;
    } else {
      interval.current = setTimeout(() => {
        if (!matchesFetchedRef.current) {
          const _matches = league.getMatches();
          if (_matches) {
            setMatches(_matches);
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
      {matches.map((cData) => {
        const {
          key,
          awayTeam,
          awayTeamScore,
          homeTeam,
          homeTeamScore,
          matchDate,
          stadium,
        } = cData || {};
        const { date, time } = getFormattedDateTime(matchDate);
        return (
          <div key={key} className="tr">
            <div className="td date-time">
              <div className="date">{date}</div>
              <div className="time">{time}</div>
            </div>
            <div className="td stadium">{stadium}</div>
            <div className="td country-cell">
              <div className="country home">
                <span>{homeTeam}</span>
                <img
                  src={`https://countryflagsapi.com/png/${homeTeam}`}
                  alt=""
                />
              </div>
            </div>
            <div className="td team-score">{`${homeTeamScore} : ${awayTeamScore}`}</div>
            <div className="td country-cell">
              <div className="country away">
                <img
                  src={`https://countryflagsapi.com/png/${awayTeam}`}
                  alt=""
                />
                <span>{awayTeam}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Header = () => {
  return (
    <div className="headers">
      {SCHEDULES_HEADER.map((cHeader) => {
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
