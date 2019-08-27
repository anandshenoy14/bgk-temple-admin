import React, { Component } from 'react';
import SignIn from './SignIn'
import MainAppBar from './MainAppBar'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import HomePage from './HomePage'
import * as firebase from 'firebase'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      "isSignedIn" : false,
      "appController" : undefined,
      "firebaseApp" : undefined
    }
  }
  componentDidMount(){
    const fetchConfig = function(){
      let p = new Promise((resolve, reject) => {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function () {
          let responseJSON = JSON.parse(this.responseText);
          resolve(responseJSON);
        });
        oReq.open("GET", "https://bgkconfig.herokuapp.com/config", true);
        oReq.send();
      })
      return p;
    }
    async function initializeFireBaseApp(){
      const configs = await fetchConfig();
      const app = firebase.initializeApp({
        apiKey: configs["BGK_FIREBASE_KEY"],
        authDomain: configs["BGK_FIREBASE_DOMAIN"]
      })
      return app;
    }
    //initialize firebase app
    initializeFireBaseApp().then(app=>{
      const controller = firebase.auth(app);
      const isSignedIn = controller.currentUser != null 
      this.setState({
          "isSignedIn" : isSignedIn,
          "appController" : controller,
          "firebaseApp" : app
      })
    });
  }
  signIn(email,password){
    console.log('Now verifying!!!')
    this.state["appController"].signInWithEmailAndPassword(email,password).then((cred)=>{
          this.setState({
            "isSignedIn" : true,
            "uname" : email
          })
          //window.location.href = `/home?uname=${cred.user.email}`
    }).catch((err)=>{
      var errorCode = err.code;
      var errorMessage = err.message;
      if (errorCode === 'auth/wrong-password') {
      console.log('Wrong password.');
      } else {
      console.log(errorMessage);
      }
      console.log(err);
    })
  }
  render() {
    return (
      <Router>
        <Route path="/" exact strict render={
          () => {
            return (
              <div>
                <MainAppBar></MainAppBar>
                {this.state.isSignedIn ? (<HomePage uname={this.state.uname}></HomePage>) : (<SignIn signInController={this.signIn.bind(this)}></SignIn>)}
              </div>);
          }
        }>
        </Route>
        <Route path="/home" exact strict component={HomePage} />
      </Router>
    );
  }
}

export default App;
