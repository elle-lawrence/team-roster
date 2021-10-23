import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import { getPlayers } from '../api/data/playerData';
import Navigation from '../components/Navigation';
import Routes from '../routes';
import SignIn from '../views/SignIn';

const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 50px 0;

  h1 {
    color: #EB4511;
    text-align: center;
    font-size: 84px;
    font-weight: 400;
    font-family: 'Norican', cursive;
    text-shadow: 2px 2px #B02E0C;
  }
  h2 {
    color: #B02E0C;
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
  }
  h3 {
    color: #EB4511;
    text-align: center;
  }
`;

function Initialize() {
  const [players, setPlayers] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getPlayers(userInfoObj.uid).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <h1 className="title">Hot Sauce Hotties</h1>
          <h2>Nashville&apos;s Hottest Roller Derby Team</h2>
          <Navigation />
          <Routes players={players} setPlayers={setPlayers} playerObj={editItem} setEditItem={setEditItem} user={user} />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </Container>
  );
}

export default Initialize;
