// index for router
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Team from '../views/Team';

export default function Routes({
  playerObj, players, setPlayers, setEditItem, user,
}) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Team players={players} setPlayers={setPlayers} setEditItem={setEditItem} />
          )}
        />
        <Route
          exact
          path="/addnewplayer"
          component={() => (
            <Form
              playerObj={playerObj}
              setPlayers={setPlayers}
              setEditItem={setEditItem}
              user={user}
            />
          )}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }),
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    uid: PropTypes.string,
    user: PropTypes.string,
  }),
};

Routes.defaultProps = { playerObj: {}, user: null };
