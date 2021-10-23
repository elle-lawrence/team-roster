# Hot Sauce Hotties Team Roster  [![Netlify Status](https://api.netlify.com/api/v1/badges/64ec0ec8-08b6-40b2-ba41-281d956b15c3/deploy-status)](https://app.netlify.com/sites/hot-sauce-hotties-roster/deploys)

This app allows the user to mange their team roster. Add new players, edit and delete them. 

[View App](https://hot-sauce-hotties-roster.netlify.app/)
## Tech Stack
- ReactJS
- Bootstrap
- Reactstrap
- SCSS

## Code Snippet
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


## About the User <!-- This is a scaled down user persona -->
- The ideal user for this application is a coach or team manager
- They have players on their teams that they would like to display and keep organized
- The problem this app solves for them is it allows them to get their players represented on a app that other users would eventually be able to log into and see who is on the team.

## Features 
- Using React to print to the Dom
- Componentized Styling
- Ability to Add players with a form component
- Ability to edit player details and delete player from roster



## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [Check out the deployed site](https://hot-sauce-hotties-roster.netlify.app/)
- [Flow Chart](https://docs.google.com/presentation/d/1q-f450WcUorv6UyCtVuWmkEzUAMkXgo_JesChZRU9wk/edit?usp=sharing)



## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->
<img width="1148" alt="Welcome Sign In" src="https://github.com/elle-lawrence/team-roster/blob/main/public/welcome-sign-in.png">
<img width="1148" alt="Team Roster View" src="https://github.com/elle-lawrence/team-roster/blob/main/public/team-view.png">
<img width="1148" alt="Form view" src="https://github.com/elle-lawrence/team-roster/blob/main/public/form-view.png">

## Contributors
- [ELLE LAWRENCE](https://github.com/elle-lawrence)
