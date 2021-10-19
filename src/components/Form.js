import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createPlayer, updatePlayer } from '../api/data/playerData';

const initialState = {
  name: '',
  imageUrl: '',
  position: '',
  uid: '',
  firebaseKey: '',
};

export default function Form({ obj, setPlayers, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        imageUrl: obj.imageUrl,
        position: obj.position,
        uid: obj.uid,
      });
    }
    // DEPENDENCY ARRAY WATCHES JUST THE OBJ TO CHANGE;
  }, [obj]);

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
    if (obj.firebaseKey) {
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        resetForm();
        history.push('/');
      });
    } else {
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
          <button className="btn btn-success" type="submit">
            {obj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </>
  );
}

Form.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

Form.defaultProps = { obj: {} };
