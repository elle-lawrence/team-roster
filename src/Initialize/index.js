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
    font-size: 64px;
    font-weight: 400;
    font-family: font-family: 'Norican', cursive;
  }
  h2 {
    color: #EB4511;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    font-family: font-family: 'Norican', cursive;
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
          <h1>Hot Sauce Hotties</h1>
          <h2>Roller Derby</h2>
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
