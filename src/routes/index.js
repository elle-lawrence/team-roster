// index for router
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Team from '../views/Team';

export default function Routes({
  players, setPlayers, editItem, setEditItem, user,
}) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Team players={players} setPlayers={setPlayers} setEditItem={setEditItem} user={user} />
          )}
        />
        <Route
          exact
          path="/addnewplayer"
          component={() => (
            <Form
              obj={editItem}
              setPlayers={setPlayers}
              setEditItem={setEditItem}
            />
          )}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  editItem: PropTypes.node.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.node,
};

Routes.defaultProps = {
  user: null,
};
