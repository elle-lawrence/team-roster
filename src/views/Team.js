import React from 'react';
import PropTypes from 'prop-types';
import Player from '../components/Player';

export default function Team({ players, setPlayers, setEditItem }) {
  console.warn(players);
  return (
    <div>
      {players.map((player) => (
        <Player
          key={player.firebaseKey}
          playerObj={player}
          setPlayers={setPlayers}
          setEditItem={setEditItem}
        />
      ))}
    </div>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
