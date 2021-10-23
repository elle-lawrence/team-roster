import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/auth';

export default function Navigation() {
  const history = useHistory();

  return (
    <div className="text-center mb-3">
      <ButtonGroup size="lg">
        <button
          type="button"
          onClick={() => history.push('/')}
          className="btn btn-light border border-dark"
        >
          Team
        </button>
        <button
          type="button"
          onClick={() => history.push('/addnewplayer')}
          className="btn btn-light border border-dark"
        >
          Add New Player
        </button>
        <button
          onClick={signOutUser}
          type="button"
          className="btn btn-danger border border-dark"
        >
          Logout
        </button>
      </ButtonGroup>
    </div>
  );
}
