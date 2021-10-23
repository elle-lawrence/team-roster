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
  box-shadow: 2px 2px grey;

  h4 {
    // flex-grow: 2;
    margin-left: 20px;
    font-family: 'Roboto', sans-serif;
    color: #B02E0C;
    text-align: center;
    padding-right: 10px;
  }

  h3 {
      color: #EB4511;
      text-shadow: 2px 1px #B02E0C;
      flex-grow: 2;
  }

  button {
    color: white;
    margin: 5px;

    &:first-child {
      margin-right: 10px;
    }
  }

  img {
      margin: 10px;
      border-radius: 15px;
  }
`;
export default function Player({
  playerObj, setPlayers, setEditItem,
}) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(playerObj).then(setPlayers);
    }
    if (method === 'edit') {
      setEditItem(playerObj);
      history.push('/addnewplayer');
    }
  };

  return (
    <>
      <PlayerStyle className="alert alert-light" role="alert">
        <img src={playerObj.imageUrl} alt="roller derby headshot" height="100" />
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
