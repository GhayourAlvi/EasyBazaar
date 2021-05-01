import './App.css';
import React,{useEffect, useState} from "react";
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HomeContainer from './containers/HomeContainer';
import LoginUserContainer from './containers/LoginUserContainer';
import RegisterUserContainer from './containers/RegisterUserContainer';
import { auth } from './helpers/firebase';
import firebase from "firebase";


function App() {

  const [user, setUser] = useState(null);


 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(userAuth => {
    if(userAuth) {
      const currentUser = {
        uid: userAuth.uid,
        email: userAuth.email,
        displayName: userAuth.displayName,
        photoURL: firebase.auth().currentUser.photoURL,
      }
      setUser(currentUser)
    }
  })
  return unsubscribe;
 },[])

 console.log(user)
  return (
     <Router>
        <Switch>
          <Route exact  path="/" render={ (props) => <LoginUserContainer {...props} />} />
          {user &&
         ( <Route user={user} path="/home" render={ (props) => <HomeContainer user={user} {...props} />} />)}
          <Route  path="/register" render={ (props) => <RegisterUserContainer {...props} />} />
        </Switch>
     </Router>
  );
}

export default App; 
