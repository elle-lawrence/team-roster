import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { deletePlayer } from '../api/data/playerData';

const PlayerStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  h4 {
    flex-grow: 2;
    margin-left: 20px;
    font-family: 'Roboto', sans-serif;
    color: #B02E0C;
  }

  h3 {
      color: #EB4511;
  }

  button {
    color: white;
    margin: 5px;

    &:first-child {
      margin-right: 10px;
    }
  }
`;
export default function Player({
  playerObj, setPlayers, setEditItem,
}) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      console.warn('deleted');
      deletePlayer(playerObj).then(setPlayers);
    }
    if (method === 'edit') {
      setEditItem(playerObj);
      history.push('/addnewplayer');
      console.warn('edited');
    }
  };

  return (
    <>
      <PlayerStyle className="alert alert-light" role="alert">
        <h3>{playerObj.name}</h3>
        <h4>{playerObj.position}</h4>
        <button
          onClick={() => handleClick('edit')}
          className="btn btn-info"
          type="button"
        >
          EDIT
        </button>
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button"
        >
          DELETE
        </button>
      </PlayerStyle>
    </>
  );
}

Player.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
