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
    color: white;
    text-align: center;
    font-size: 64px;
    font-weight: 400;
  }

  h3 {
    color: lightgrey;
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
        getPlayers('18LRpadeHkg2bx6ADMbsM0FlWPv2').then(console.warn);
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
          <Navigation />
          <Routes players={players} setPlayers={setPlayers} editItem={editItem} setEditItem={setEditItem} />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </Container>
  );
}

export default Initialize;
