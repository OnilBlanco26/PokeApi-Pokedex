import React from 'react';
import './Pokedex/styles/stats.css';


function StatBar({name, value, max}) {
  return (
    <div className="stat-bar">
      <div className="stat-name">{name}</div>
      <div className="stat-value">
        <div
          className="stat-fill"
          style={{width: `${(value / max) * 100}%`}}
        ></div>
      </div>
      <div className="stat-max">{`${value}/${max}`}</div>
    </div>
  );
}

function Stats({stats}) {
  return (
    <div className="stats-container">
      {stats?.map(stat => (
        <StatBar
          key={stat.stat.name}
          name={stat.stat.name}
          value={stat.base_stat}
          max={200}
        />
      ))}
    </div>
  );
}

export default Stats;