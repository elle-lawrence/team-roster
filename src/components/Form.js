import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createPlayer, updatePlayer } from '../api/data/playerData';

const initialState = {
  name: '',
  imageUrl: '',
  position: '',
  firebaseKey: '',
};

export default function Form({
  playerObj, setPlayers, setEditItem, user,
}) {
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (playerObj.firebaseKey) {
        setFormInput({
          name: playerObj.name,
          firebaseKey: playerObj.firebaseKey,
          imageUrl: playerObj.imageUrl,
          position: playerObj.position,
          uid: user.uid,
        });
      }
    }
    return () => {
      isMounted = false;
    };
    // DEPENDENCY ARRAY WATCHES JUST THE OBJ TO CHANGE;
  }, [playerObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,

    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerObj.firebaseKey) {
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        resetForm();
        history.push('/');
      });
    } else {
      console.warn(formInput);
      createPlayer({ ...formInput }).then((players) => {
        setPlayers(players);
        resetForm();
        history.push('/');
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <input
            className="form-control form-control-lg me-1"
            type="text"
            name="name"
            id="name"
            value={formInput.name}
            onChange={handleChange}
            placeholder="ADD A PLAYER"
            required
          />
          <input
            className="form-control form-control-lg me-1"
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            placeholder="ADD IMAGE URL"
            required
          />
          <input
            className="form-control form-control-lg me-1"
            type="text"
            name="position"
            id="position"
            value={formInput.position}
            onChange={handleChange}
            placeholder="ADD POSITION"
            required
          />
          <button className="btn btn-success" type="submit">
            {playerObj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </>
  );
}

Form.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    uid: PropTypes.string,
    user: PropTypes.string,
  }),
};

Form.defaultProps = { playerObj: {}, user: null };
